import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import {
  getMrKrabsAddress,
  getCakeAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getRabbitMintingFarmAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getKrustyAddress,
  getPattyAddress,
  getMasterChefAddress,
  getSousChefAddress,
} from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import krusty from 'config/abi/krustyToken.json'
import patty from 'config/abi/pattyToken.json'
import mrKrabs from 'config/abi/mrKrabs.json'
import sousChef from 'config/abi/sousChef.json'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import pancakeRabbits from 'config/abi/pancakeRabbits.json'
import lottery from 'config/abi/lottery.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import profile from 'config/abi/pancakeProfile.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}

export const useCake = () => {
  return useERC20(getCakeAddress())
}

export const useKrusty = () => {
  const krustyAbi = (krusty as unknown) as AbiItem
  return useContract(krustyAbi, getKrustyAddress())
}

export const usePatty = () => {
  const pattyAbi = (patty as unknown) as AbiItem
  return useContract(pattyAbi, getPattyAddress())
}

export const useMrKrabs = () => {
  const mrKrabsAbi = (mrKrabs as unknown) as AbiItem
  return useContract(mrKrabsAbi, getMrKrabsAddress())
}

export const useRabbitMintingFarm = () => {
  const rabbitMintingFarmAbi = (rabbitmintingfarm as unknown) as AbiItem
  return useContract(rabbitMintingFarmAbi, getRabbitMintingFarmAddress())
}

export const usePancakeRabbits = () => {
  const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
  return useContract(pancakeRabbitsAbi, getPancakeRabbitsAddress())
}

export const useProfile = () => {
  const profileABIAbi = (profile as unknown) as AbiItem
  return useContract(profileABIAbi, getPancakeProfileAddress())
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useMasterChef = () => {
  const abi = (masterChef as unknown) as AbiItem
  return useContract(abi, getMasterChefAddress())
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  // const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = (sousChef as unknown) as AbiItem
  return useContract(abi, getSousChefAddress()) // config.contractAddress[process.env.REACT_APP_CHAIN_ID])
}

export default useContract
