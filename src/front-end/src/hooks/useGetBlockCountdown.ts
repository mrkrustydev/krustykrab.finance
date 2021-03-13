import { useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'

/* eslint-disable camelcase */

export interface BlockCountdown {
  startBlock: string
  currentBlock: string
  remainingBlocks: string
  days: string
  hours: string
  mins: string
  secs: string
}

export const useGetBlockCountdown = () => {
  const [data, setData] = useState<BlockCountdown | null>(null)
  const startBlock = '4878910'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blockCountdown : BlockCountdown = {
          currentBlock: '',
          startBlock: '',
          remainingBlocks: '',
          days: '',
          hours: '',
          mins: '',
          secs: ''
        }
        // use web3.eth.getBlock to get current block and block from past to compute time elapsed between their timestamps
        // then determine approx time until target block is reached
        setData(null)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData, startBlock])

  return data
}
