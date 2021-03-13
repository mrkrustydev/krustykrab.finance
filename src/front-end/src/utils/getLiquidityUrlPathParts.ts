// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
// In the URL, using the quote token 'BNB' is represented by 'ETH'

import { QuoteToken } from '../config/constants/types'


const knownSymbols = [ QuoteToken.BNB, QuoteToken.BUSD, QuoteToken.USDT ]

const getLiquidityUrlPathParts = ({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses }) => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const firstPart = quoteTokenAdresses[chainId] // knownSymbols.filter(s => s === quoteTokenSymbol) ? quoteTokenSymbol : quoteTokenAdresses[chainId]
  const secondPart = tokenAddresses[chainId]
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
