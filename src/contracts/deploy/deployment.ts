import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import utils from './utilities'
import testWallets from './testWallets'

async function main() {
  const krustyFactory = await ethers.getContractFactory("KrustyToken");
  const pattyFactory = await ethers.getContractFactory("PattyToken");
  const mrKrabsFactory = await ethers.getContractFactory("MrKrabs");

  const tokenCount = '1000000000000000000000';

  console.log("Deploying KrustyToken");
  const krustyContract = await utils.deployContract(krustyFactory);
  console.log();

  console.log("Minting 1,000 tokens for the owner");
  const mint = krustyContract.functions['mint(address,uint256)'];
  const [signer] = await ethers.getSigners();
  let txHash = await mint(signer.address, tokenCount);
  console.log("Mint Txn Hash: ", txHash);

  for (let i = 0; i < testWallets.testers.length; i++) {
    console.log(`Minting 1,000 tokens for ${testWallets.testers[i]}`);
    txHash = await mint(testWallets.testers[i], tokenCount);
    console.log("Mint Txn Hash: ", txHash);
    console.log();
  }

  console.log("Deploying PattyToken");
  const pattyContract = await utils.deployContract(pattyFactory, krustyContract.address);
  console.log();

  console.log("Deploying MrKrabs");
  const signers = await ethers.getSigners();
  const blockNumber = await ethers.provider.getBlockNumber();
  const rewardsPerBlock = '4000000000000000000';  // 4 rewards per block
  const masterKrustyContract = await utils.deployMasterChefContract(
    mrKrabsFactory,
    krustyContract.address,
    pattyContract.address,
    testWallets.devWallet,
    testWallets.feeWallet,
    rewardsPerBlock,
    blockNumber + 10
  );

  console.log("Transfering Ownership of Krusty to MrKrabs");
  let transferOwnership = krustyContract.functions['transferOwnership'];
  txHash = await transferOwnership(masterKrustyContract.address);
  console.log("Transfer Txn Hash: ", txHash);
  console.log();

  console.log("Transfering Ownership of LilKrusty to MrKrabs");
  transferOwnership = pattyContract.functions['transferOwnership'];
  txHash = await transferOwnership(masterKrustyContract.address);
  console.log("Transfer Txn Hash: ", txHash);
  console.log();

  console.log("Contract Addresses for easy access:");
  console.log("Krusty Contract Address: ", krustyContract.address);
  console.log("LilKrusty Contract Address: ", pattyContract.address);
  console.log("MrKrabs Contract Address: ", masterKrustyContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });