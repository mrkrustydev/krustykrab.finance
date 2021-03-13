import { getKrustyAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's Espresso balance is at least the amount passed in
 */
const useHasEspressoBalance = (minimumBalance) => {
  const krustyBalance = useTokenBalance(getKrustyAddress())
  return krustyBalance.gte(minimumBalance)
}

export default useHasEspressoBalance
