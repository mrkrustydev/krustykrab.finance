import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, sousUnstake } from 'utils/callHelpers'
import { useMrKrabs, useSousChef } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const mrKrabsContract = useMrKrabs()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(mrKrabsContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, mrKrabsContract, pid],
  )

  return { onUnstake: handleUnstake }
}


export const useSousUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const mrKrabsContract = useMrKrabs()
  const sousChefContract = useSousChef(sousId)
  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(mrKrabsContract, 0, amount, account)
        // console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account)
        // console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, mrKrabsContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
