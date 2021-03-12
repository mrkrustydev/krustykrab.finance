import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "@nomiclabs/hardhat-truffle5"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-web3"

const config: HardhatUserConfig = {
    defaultNetwork: "bscTestnet",
    networks: {
      hardhat: {
      },
      bsc: {
        url: "https://bsc-dataseed.binance.org/",
        accounts: [],
        chainId: 56,
        loggingEnabled: true
      },
      bscTestnet: {
        url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        accounts: [],
        chainId: 97,
        loggingEnabled: true
      },
      localhost: {
        url: "http://127.0.0.1:8545/",
        accounts: "remote",
        loggingEnabled: true
      }
    },
    solidity: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
    paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts"
    },
    mocha: {
      timeout: 20000
    }
  };

  export default config;