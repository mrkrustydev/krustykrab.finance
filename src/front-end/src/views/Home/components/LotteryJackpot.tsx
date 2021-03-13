import React from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import { Text } from '../../../pancake-uikit/src'


const LotteryJackpot = () => {
  const lotteryPrizeAmount = useTotalRewards()

  return (
    <Text bold fontSize="24px">
      {getBalanceNumber(lotteryPrizeAmount).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </Text>
  )
}

export default LotteryJackpot
