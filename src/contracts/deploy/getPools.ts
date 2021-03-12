import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import contracts from './contracts'
import utils from './utilities'

const REACT_BLOCKCHAIN_ID = 97


async function main() {
  const chefAddress = contracts.mrKrabs[REACT_BLOCKCHAIN_ID];

  console.log("Grabbing MrKrabs Factory");
  const factory = await ethers.getContractFactory("MrKrabs");
  console.log("Attaching Contract: ", chefAddress);
  const masterPepeContract = await factory.attach(chefAddress);
  console.log();

  console.log("Getting Pools");
  await utils.printPools(masterPepeContract);
}



main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });