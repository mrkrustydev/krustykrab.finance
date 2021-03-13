import { usePriceKrustyBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalKrusty = getBalanceNumber(totalRewards)
  const krustyPriceBusd = usePriceKrustyBusd()

  return totalKrusty * krustyPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
