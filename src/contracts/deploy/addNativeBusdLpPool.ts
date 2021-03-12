import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import contracts from './contracts'
import utils from './utilities'

const REACT_BLOCKCHAIN_ID = 97

async function main() {
  const allocPoint = 100;
  const multiplier = 20;
  const depositFeeBP = 0;
  const withUpdate = false;
  const lpAddress = contracts.krustyBusdLp[REACT_BLOCKCHAIN_ID];
  const chefAddress = contracts.mrKrabs[REACT_BLOCKCHAIN_ID];

  const tx = await utils.addLiquidityPool("MrKrabs", chefAddress, lpAddress, allocPoint, multiplier, depositFeeBP, withUpdate);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });