import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

namespace utils {
  export const REACT_BLOCKCHAIN_ID = '97'

  export async function deployContract(factory: ContractFactory, contractAddress?: string): Promise<Contract> {
    // If we had constructor arguments, they would be passed into deploy()
    let contract = contractAddress ? await factory.deploy(contractAddress) : await factory.deploy();

    // The address the Contract WILL have once mined
    console.log("Contract Address: ", contract.address);
    console.log("Contract Owner", contract.deployTransaction.from);

    // The transaction that was sent to the network to deploy the Contract
    console.log("Deployment Hash", contract.deployTransaction.hash);
    console.log();

    // The contract is NOT deployed yet; we must wait until it is mined
    return await contract.deployed();
  }

  export async function deployMasterChefContract(
    factory: ContractFactory,
    mainTokenContract: string,
    subTokenContract: string,
    devAddress: string,
    buybackAddress: string,
    rewardsPerBlock: string,
    blockNumber: any
  ) {
    // Pass constructor arguments into deploy(...)
    let contract = await factory.deploy(mainTokenContract, subTokenContract, devAddress, buybackAddress, rewardsPerBlock, blockNumber);

    // The address the Contract WILL have once mined
    console.log("Contract Address: ", contract.address);
    console.log("Contract Owner", contract.deployTransaction.from);

    // The transaction that was sent to the network to deploy the Contract
    console.log("Deployment Hash", contract.deployTransaction.hash);
    console.log();

    // The contract is NOT deployed yet; we must wait until it is mined
    return await contract.deployed();
  }

  export async function updateRewardsPerBlock(masterChefAddress: string, rewardsPerBlock: string, contractName: string, functionName: string): Promise<any> {
    const masterChefFactory = await ethers.getContractFactory(contractName);
    const contract = await masterChefFactory.attach(masterChefAddress);
    const updateRewards = await contract.functions[functionName];
    const txHash = await updateRewards(rewardsPerBlock);
    console.log("Update Rewards Per Block tx hash: ", txHash);
  }

  export async function changeOwner(owner: string, newOwner: string, contractName: string, contractAddress: string): Promise<any> {
    const contractFactory = await ethers.getContractFactory("contractName");
    const contract = await contractFactory.attach(contractAddress);
    const transferOwnership = await contract.functions['transferOwnership'];
    const txHash = await transferOwnership(newOwner);
    console.log(`Ownership of ${contractAddress} transfered from ${owner} to ${newOwner}`);
    return txHash;
  }

  export async function addLiquidityPool(
    contractName: string, 
    contractAddress: string, 
    lpAddress: string, 
    allocPoint: number, 
    multiplier: number, 
    depositFee: number, 
    withUpdate: boolean
  ) {
    console.log(`Grabbing ${contractName} Factory`);
    const factory = await ethers.getContractFactory(contractName);
    console.log("Attaching Contract: ", contractAddress);
    const contract = await factory.attach(contractAddress);
    console.log("Getting Add Pool Function...");
    const add = await contract.functions['add'];
    console.log();

    console.log("Adding Pool: ", lpAddress);
    const txHash = await add(allocPoint * multiplier, lpAddress, depositFee, withUpdate);
    console.log(txHash);
    console.log();
  }

  export async function printPools(contract: Contract) {
    const poolInfo = await contract.functions['poolInfo'];
    const poolLength = await contract.functions['poolLength'];
    const length = await poolLength();
    console.log("Number of pools: ", length.toString())
    for (let i = 0; i < length; i++) {
      const pool = await poolInfo(i);
      console.log(pool);
    }
  }
}

export default utils;
