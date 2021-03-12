// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.12;

import './libs/math/SafeMath.sol';
import './libs/token/BEP20/IBEP20.sol';
import './libs/token/BEP20/SafeBEP20.sol';
import './libs/access/Ownable.sol';

import "./KrustyToken.sol";
import "./PattyToken.sol";


// The MrKrabs is the master of the Krusty Krab, Krusty Token & Patty Token. 
//
// Note that it's ownable and the owner wields tremendous power. The ownership
// will be transferred to a governance smart contract once KRUSTY is sufficiently
// distributed and the community can show to govern itself.
//
// Have fun reading it. Hopefully it's bug-free. God bless.
contract MrKrabs is Ownable {
    using SafeMath for uint256;
    using SafeBEP20 for IBEP20;

    // Info of each user.
    struct UserInfo {
        uint256 amount;     // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        //
        // We do some fancy math here. Basically, any point in time, the amount of KRUSTYs
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accKrustyPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accKrustyPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }

    // Info of each pool.
    struct PoolInfo {
        IBEP20 lpToken;             // Address of LP token contract.
        uint256 allocPoint;         // How many allocation points assigned to this pool. KRUSTYs to distribute per block.
        uint256 lastRewardBlock;    // Last block number that KRUSTYs distribution occurs.
        uint256 accKrustyPerShare;  // Accumulated KRUSTYs per share, times 1e12. See below.
        uint16 depositFeeBP;        // Deposit fee in basis points
    }

    // The KRUSTY TOKEN
    KrustyToken public krusty;
    // The SAUCE TOKEN
    PattyToken public patty;
    // Dev address.
    address public devaddr;
    // Fee address for buyback and burning.
    address public feeAddress;
    // SPB tokens created per block.
    // KRUSTY tokens created per block.
    uint256 public krustyPerBlock;
    // Bonus muliplier for early krusty krabby patty makers.
    uint256 public BONUS_MULTIPLIER = 1;
    uint16 public DEPOSIT_FEE_BASIS = 10000;
    // The migrator contract. It has a lot of power. Can only be set through governance (owner).
    //IMigratorChef public migrator;

    // Info of each pool.
    PoolInfo[] public poolInfo;
    // Info of each user that stakes LP tokens.
    mapping (uint256 => mapping (address => UserInfo)) public userInfo;
    // Total allocation points. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when KRUSTY mining starts.
    uint256 public startBlock;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);

    constructor(
        KrustyToken _krusty,
        PattyToken _patty,
        address _devAddr,
        address _feeAddr,
        uint256 _krustyPerBlock,
        uint256 _startBlock
    ) public {
        krusty = _krusty;
        patty = _patty;
        devaddr = _devAddr;
        feeAddress = _feeAddr;
        krustyPerBlock = _krustyPerBlock;
        startBlock = _startBlock;

        // staking pool
        poolInfo.push(PoolInfo({
            lpToken: _krusty,
            allocPoint: 1000,
            lastRewardBlock: startBlock,
            accKrustyPerShare: 0,
            depositFeeBP: 0
        }));

        totalAllocPoint = 1000;

    }

    function updateMultiplier(uint256 multiplierNumber) public onlyOwner {
        BONUS_MULTIPLIER = multiplierNumber;
    }
    function updateKrustyPerBlock(uint256 _krustyPerBlock) public onlyOwner {
        krustyPerBlock = _krustyPerBlock;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    // XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do.
    function add(uint256 _allocPoint, IBEP20 _lpToken, uint16 _depositFeeBP, bool _withUpdate) public onlyOwner {
        require(_depositFeeBP <= DEPOSIT_FEE_BASIS, "add: invalid deposit fee basis points");
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(PoolInfo({
            lpToken: _lpToken,
            allocPoint: _allocPoint,
            lastRewardBlock: lastRewardBlock,
            accKrustyPerShare: 0,
            depositFeeBP: _depositFeeBP
        }));
        updateStakingPool();
    }

    // Update the given pool's KRUSTY allocation point. Can only be called by the owner.
    function set(uint256 _pid, uint256 _allocPoint, uint16 _depositFeeBP, bool _withUpdate) public onlyOwner {
        require(_depositFeeBP <= DEPOSIT_FEE_BASIS, "set: invalid deposit fee basis points");
        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint = totalAllocPoint.sub(poolInfo[_pid].allocPoint).add(_allocPoint);
        poolInfo[_pid].allocPoint = _allocPoint;
        poolInfo[_pid].depositFeeBP = _depositFeeBP;
    }

    function updateStakingPool() internal {
        uint256 length = poolInfo.length;
        uint256 points = 0;
        for (uint256 pid = 1; pid < length; ++pid) {
            points = points.add(poolInfo[pid].allocPoint);
        }
        if (points != 0) {
            points = points.div(3);
            totalAllocPoint = totalAllocPoint.sub(poolInfo[0].allocPoint).add(points);
            poolInfo[0].allocPoint = points;
        }
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        return _to.sub(_from).mul(BONUS_MULTIPLIER);
    }

    // View function to see pending KRUSTYs on frontend.
    function pendingKrusty(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accKrustyPerShare = pool.accKrustyPerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 krustyReward = multiplier.mul(krustyPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
            accKrustyPerShare = accKrustyPerShare.add(krustyReward.mul(1e12).div(lpSupply));
        }
        return user.amount.mul(accKrustyPerShare).div(1e12).sub(user.rewardDebt);
    }

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }


    // Update reward variables of the given pool.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 krustyReward = multiplier.mul(krustyPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
        krusty.mint(devaddr, krustyReward.div(10));
        krusty.mint(address(patty), krustyReward);
        pool.accKrustyPerShare = pool.accKrustyPerShare.add(krustyReward.mul(1e12).div(lpSupply));
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to MrKrabs for KRUSTY allocation.
    function deposit(uint256 _pid, uint256 _amount) public {

        require (_pid != 0, 'deposit KRUSTY by staking');

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(pool.accKrustyPerShare).div(1e12).sub(user.rewardDebt);
            if(pending > 0) {
                safeKrustyTransfer(msg.sender, pending);
            }
        }
        if (_amount > 0) {
            pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            if(pool.depositFeeBP > 0){
                uint256 depositFee = _amount.mul(pool.depositFeeBP).div(DEPOSIT_FEE_BASIS);
                pool.lpToken.safeTransfer(feeAddress, depositFee);
                user.amount = user.amount.add(_amount).sub(depositFee);
            }else{
                user.amount = user.amount.add(_amount);
            }
        }
        user.rewardDebt = user.amount.mul(pool.accKrustyPerShare).div(1e12);
        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens from MrKrabs.
    function withdraw(uint256 _pid, uint256 _amount) public {

        require (_pid != 0, 'withdraw KRUSTY by unstaking');
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");

        updatePool(_pid);
        uint256 pending = user.amount.mul(pool.accKrustyPerShare).div(1e12).sub(user.rewardDebt);
        if(pending > 0) {
            safeKrustyTransfer(msg.sender, pending);
        }
        if(_amount > 0) {
            user.amount = user.amount.sub(_amount);
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
        }
        user.rewardDebt = user.amount.mul(pool.accKrustyPerShare).div(1e12);
        emit Withdraw(msg.sender, _pid, _amount);
    }

    // Stake KRUSTY tokens to MrKrabs
    function enterStaking(uint256 _amount) public {
        PoolInfo storage pool = poolInfo[0];
        UserInfo storage user = userInfo[0][msg.sender];
        updatePool(0);
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(pool.accKrustyPerShare).div(1e12).sub(user.rewardDebt);
            if(pending > 0) {
                safeKrustyTransfer(msg.sender, pending);
            }
        }
        if(_amount > 0) {
            pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            user.amount = user.amount.add(_amount);
        }
        user.rewardDebt = user.amount.mul(pool.accKrustyPerShare).div(1e12);

        patty.mint(msg.sender, _amount);
        emit Deposit(msg.sender, 0, _amount);
    }

    // Withdraw KRUSTY tokens from STAKING.
    function leaveStaking(uint256 _amount) public {
        PoolInfo storage pool = poolInfo[0];
        UserInfo storage user = userInfo[0][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updatePool(0);
        uint256 pending = user.amount.mul(pool.accKrustyPerShare).div(1e12).sub(user.rewardDebt);
        if(pending > 0) {
            safeKrustyTransfer(msg.sender, pending);
        }
        if(_amount > 0) {
            user.amount = user.amount.sub(_amount);
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
        }
        user.rewardDebt = user.amount.mul(pool.accKrustyPerShare).div(1e12);

        patty.burn(msg.sender, _amount);
        emit Withdraw(msg.sender, 0, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        pool.lpToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, _pid, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
    }

    // Safe krusty transfer function, just in case if rounding error causes pool to not have enough KRUSTYs.
    function safeKrustyTransfer(address _to, uint256 _amount) internal {
        patty.safeKrustyTransfer(_to, _amount);
    }

    // Update dev address by the previous dev.
    function dev(address _devaddr) public {
        require(msg.sender == devaddr, "dev: wut?");
        devaddr = _devaddr;
    }
    
    // Update fee address by the previous fee address holder.
    function setFeeAddress(address _feeAddress) public{
        require(msg.sender == feeAddress, "setFeeAddress: FORBIDDEN");
        feeAddress = _feeAddress;
    }

    // Update reward emissions rate across all pools
    function updateEmissionRate(uint256 _krustyPerBlock) public onlyOwner {
        massUpdatePools();
        krustyPerBlock = _krustyPerBlock;
    }
}
