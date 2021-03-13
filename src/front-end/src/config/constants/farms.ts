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
  // {
  //   pid: 3,
  //   lpSymbol: 'KRUSTY-USDT LP',
  //   lpAddresses: {
  //     97: contracts.krustyUsdtLp[97],
  //     56: contracts.krustyUsdtLp[56],
  //   },
  //   tokenSymbol: 'KRUSTY',
  //   tokenAddresses: {
  //     97: contracts.krusty[97],
  //     56: contracts.krusty[56],
  //   },
  //   quoteTokenSymbol: QuoteToken.USDT,
  //   quoteTokenAdresses: contracts.usdt,  
  //   lpAddUrl: { 
  //     56: `https://www.streetswap.vip/#/add/${contracts.usdt[56]}/${contracts.krusty[56]}`,
  //     97: `https://www.streetswap.vip/#/add/${contracts.usdt[97]}/${contracts.krusty[97]}`,
  //   },
  //   displayName: 'Short Ribs Pool',
  //   isCommunity: false
  // },
  // {
  //   pid: 4,
  //   lpSymbol: 'CAKE-BNB LP',
  //   lpAddresses: {
  //     97: contracts.cakeBnbLp[97],
  //     56: contracts.cakeBnbLp[56],
  //   },
  //   tokenSymbol: 'KRUSTY',
  //   tokenAddresses: {
  //     97: contracts.krusty[97],
  //     56: contracts.krusty[56],
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,  
  //   lpAddUrl: { 
  //     56: `https://exchange.pancakeswap.finance/#/add/${contracts.cake[56]}/${contracts.krusty[56]}`,
  //     97: `https://www.streetswap.vip/#/add/${contracts.cake[97]}/${contracts.krusty[97]}`,
  //   },
  //   displayName: 'Beefcake Pool',
  //   isCommunity: true
  // },
  // {
  //   pid: 5,
  //   lpSymbol: 'BIFI-BNB LP',
  //   lpAddresses: {
  //     97: contracts.bifiBnbLp[97],
  //     56: contracts.bifiBnbLp[56],
  //   },
  //   tokenSymbol: 'KRUSTY',
  //   tokenAddresses: {
  //     97: contracts.krusty[97],
  //     56: contracts.krusty[56],
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,  
  //   lpAddUrl: { 
  //     56: `https://exchange.pancakeswap.finance/#/add/ETH/${contracts.bifi[56]}`,
  //     97: `https://www.streetswap.vip/#/add/BNB/${contracts.bifi[97]}`,
  //   },
  //   displayName: 'Fillet Mignon Pool',
  //   isCommunity: true
  // },
  // {
  //   pid: 6,
  //   lpSymbol: 'THUGS-BNB LP',
  //   lpAddresses: {
  //     97: contracts.thugsBnbLp[97],
  //     56: contracts.thugsBnbLp[56],
  //   },
  //   tokenSymbol: 'KRUSTY',
  //   tokenAddresses: {
  //     97: contracts.krusty[97],
  //     56: contracts.krusty[56],
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,  
  //   lpAddUrl: { 
  //     56: `https://www.streetswap.vip/#/add/BNB/${contracts.thugs[56]}`,
  //     97: `https://www.streetswap.vip/#/add/BNB/${contracts.thugs[97]}`,
  //   },
  //   displayName: 'T-Bone Pool',
  //   isCommunity: true
  // },
  // {
  //   pid: 7,
  //   lpSymbol: 'FUEL-BNB LP',
  //   lpAddresses: {
  //     97: contracts.fuelBnbLp[97],
  //     56: contracts.fuelBnbLp[56],
  //   },
  //   tokenSymbol: 'KRUSTY',
  //   tokenAddresses: {
  //     97: contracts.krusty[97],
  //     56: contracts.krusty[56],
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,  
  //   lpAddUrl: { 
  //     56: `https://www.streetswap.vip/#/add/BNB/${contracts.krusty[56]}`,
  //     97: `https://www.streetswap.vip/#/add/${contracts.fuel[97]}/${contracts.krusty[97]}`,
  //   },
  //   displayName: 'Tri-Tip Pool',
  //   isCommunity: true
  // },
  // {
  //   pid: 8,
  //   lpSymbol: 'LINK-BNB LP',
  //   lpAddresses: {
  //     97: contracts.linkBnbLp[97],
  //     56: contracts.linkBnbLp[56],
  //   },
  //   tokenSymbol: 'KRUSTY',
  //   tokenAddresses: {
  //     97: contracts.krusty[97],
  //     56: contracts.krusty[56],
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,  
  //   lpAddUrl: { 
  //     56: `https://exchange.pancakeswap.finance/#/add/ETH/${contracts.link[56]}`,
  //     97: `https://www.streetswap.vip/#/add/BNB/${contracts.link[97]}`,
  //   },
  //   displayName: 'Hot Links Pool',
  //   isCommunity: true
  // },
  // {
  //   pid: 9,
  //   lpSymbol: 'bTBB-BNB LP',
  //   lpAddresses: {
  //     97: contracts.bTbbBnbLp[97],
  //     56: contracts.bTbbBnbLp[56],
  //   },
  //   tokenSymbol: 'KRUSTY',
  //   tokenAddresses: {
  //     97: contracts.krusty[97],
  //     56: contracts.krusty[56],
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,  
  //   lpAddUrl: { 
  //     56: `https://exchange.pancakeswap.finance/#/add/ETH/${contracts.bTBB[56]}`,
  //     97: `https://www.streetswap.vip/#/add/BNB/${contracts.bTBB[97]}`,
  //   },
  //   displayName: 'Sirloin Butler Pool',
  //   isCommunity: true
  // },
  // {
  //   pid: 10,
  //   lpSymbol: 'KRUSTY-bTBB LP',
  //   lpAddresses: {
  //     97: contracts.krustybTbbLp[97],
  //     56: contracts.krustybTbbLp[56],
  //   },
  //   tokenSymbol: 'KRUSTY',
  //   tokenAddresses: {
  //     97: contracts.krusty[97],
  //     56: contracts.krusty[56],
  //   },
  //   quoteTokenSymbol: QuoteToken.bTBB,
  //   quoteTokenAdresses: contracts.bTBB,  
  //   lpAddUrl: { 
  //     56: `https://exchange.pancakeswap.finance/#/add/${contracts.bTBB[56]}/${contracts.krusty[56]}`,
  //     97: `https://www.streetswap.vip/#/add/${contracts.bTBB[56]}/${contracts.krusty[56]}`,
  //   },
  //   displayName: 'KrustyKrab Butler Pool',
  //   isCommunity: true
  // }
]

export default farms
