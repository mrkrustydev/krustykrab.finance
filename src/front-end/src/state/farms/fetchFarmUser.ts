import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import mrKrabsABI from 'config/abi/mrKrabs.json'
import multicall from 'utils/multicall'
import farmsConfig from 'config/constants/farms'
import { getMrKrabsAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchFarmUserAllowances = async (account: string) => {
  
  const mrKrabsAddress = getMrKrabsAddress()

  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isSingleAsset ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return { 
      address: lpContractAddress, 
      name: 'allowance', 
      params: [account, mrKrabsAddress] 
    }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })

  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string) => {
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isSingleAsset ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })

  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string) => {
  const mrKrabsAddress = getMrKrabsAddress()

  const calls = farmsConfig.map((farm) => {
    return {
      address: mrKrabsAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(mrKrabsABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string) => {
  const mrKrabsAddress = getMrKrabsAddress()
  
  const calls = farmsConfig.map((farm) => {
    
    return {
      address: mrKrabsAddress,
      name: 'pendingKrusty',
      params: [farm.pid, account],
    }
  })
  
  const rawEarnings = await multicall(mrKrabsABI, calls)

  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  
  return parsedEarnings
}
