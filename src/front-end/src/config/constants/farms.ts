import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'KRUSTY',
    lpAddresses: {
      97: contracts.krusty[97],
      56: contracts.krusty[56], // contracts.krusty[56],
    },
    tokenSymbol: 'SAUCE',
    tokenAddresses: {
      97: contracts.krusty[97],
      56: contracts.krusty[56], // contracts.krusty[56],
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    displayName: 'KRUSTY'
  },
  {
    pid: 1,
    lpSymbol: 'KRUSTY-BNB LP',
    lpAddresses: {
      97: contracts.krustyBnbLp[97],
      56: contracts.krustyBnbLp[56],
    },
    tokenSymbol: 'KRUSTY',
    tokenAddresses: {
      97: contracts.krusty[97],
      56: contracts.krusty[56],
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: { 
      56: `https://exchange.pancakeswap.finance/#/add/ETH/${contracts.krusty[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.krusty[97]}`
    },
    displayName: 'Krabby Patty Pool',
    isCommunity: false,
    image: 'Krusty-BnB.png'
  },
  {
    pid: 2,
    lpSymbol: 'KRUSTY-BUSD LP',
    lpAddresses: {
      97: contracts.krustyBusdLp[97],
      56: contracts.krustyBusdLp[56],
    },
    tokenSymbol: 'KRUSTY',
    tokenAddresses: {
      97: contracts.krusty[97],
      56: contracts.krusty[56],
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: { 
      56: `https://exchange.pancakeswap.finance/#/add/${contracts.busd[56]}/${contracts.krusty[56]}`,
      97: `https://www.streetswap.vip/#/add/${contracts.busd[97]}/${contracts.krusty[97]}`
    },
    displayName: 'Krabby Bucks Pool',
    isCommunity: false
  },
  {
    pid: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: contracts.bnbBusdLp[97],
      56: contracts.bnbBusdLp[56],
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: contracts.wbnb[97],
      56: contracts.wbnb[56],
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,  
    lpAddUrl: { 
      56: `https://exchange.pancakeswap.finance/#/add/ETH/${contracts.busd[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.busd[97]}`,
    },
    displayName: 'Krabby Combo Pool',
    isCommunity: false
  }
]

export default farms
