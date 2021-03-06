import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const lpAddBaseUrl = "https://exchange.thekrustykrab.finance"

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'KRUSTY',
    lpAddresses: contracts.krustyBusdLp,
    tokenSymbol: 'KRUSTY',
    tokenAddresses: contracts.krusty,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.krusty[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.krusty[97]}`
    },
    displayName: 'KRUSTY',
    isSingleAsset: true,
    depositFee: 0
  },
  {
    pid: 1,
    lpSymbol: 'KRUSTY-BNB LP',
    lpAddresses: contracts.krustyBnbLp,
    tokenSymbol: 'KRUSTY',
    tokenAddresses: contracts.krustyBusdLp,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: { 
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.krusty[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.krusty[97]}`
    },
    displayName: 'Krabby Patty Pool',
    isCommunity: false,
    image: 'Krusty-BnB.png'
  },
  {
    pid: 2,
    lpSymbol: 'KRUSTY-BUSD LP',
    lpAddresses: contracts.krustyBusdLp,
    tokenSymbol: 'KRUSTY',
    tokenAddresses: contracts.krusty,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: { 
      56: `${lpAddBaseUrl}/#/add/${contracts.busd[56]}/${contracts.krusty[56]}`,
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
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.busd[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.busd[97]}`,
    },
    displayName: 'Krabby Combo Pool',
    isCommunity: false,
    depositFee: 400,
  },
  {
    pid: 4,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: contracts.ethBnbLp,
    tokenSymbol: 'ETH',
    tokenAddresses: contracts.eth,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.eth[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.eth[97]}`,
    },
    displayName: 'Krabby Deluxe Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 5,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: contracts.dotBnbLp,
    tokenSymbol: 'DOT',
    tokenAddresses: contracts.dot,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.dot[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.dot[97]}`,
    },
    displayName: 'Dot Patty Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 6,
    lpSymbol: 'ADA-BNB LP',
    lpAddresses: contracts.adaBnbLp,
    tokenSymbol: 'ADA',
    tokenAddresses: contracts.ada,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.ada[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.ada[97]}`,
    },
    displayName: 'Patrick Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 7,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: contracts.btcbBnbLp,
    tokenSymbol: 'BTCB',
    tokenAddresses: contracts.btcb,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.btcb[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.btcb[97]}`,
    },
    displayName: 'Mr. Krabs Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 8,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: contracts.usdtBusdLp,
    tokenSymbol: 'USDT',
    tokenAddresses: contracts.usdt,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/${contracts.usdt[56]}/${contracts.busd[56]}`,
      97: `https://www.streetswap.vip/#/add/${contracts.usdt[97]}/${contracts.busd[97]}`,
    },
    displayName: 'Plankton Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 9,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: contracts.daiBusdLp,
    tokenSymbol: 'DAI',
    tokenAddresses: contracts.dai,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/${contracts.dai[56]}/${contracts.busd[56]}`,
      97: `https://www.streetswap.vip/#/add/${contracts.dai[97]}/${contracts.busd[97]}`,
    },
    displayName: 'Kelp Rings Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 10,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: contracts.usdcBusdLp,
    tokenSymbol: 'USDC',
    tokenAddresses: contracts.usdc,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/${contracts.usdc[56]}/${contracts.busd[56]}`,
      97: `https://www.streetswap.vip/#/add/${contracts.usdc[97]}/${contracts.busd[97]}`,
    },
    displayName: 'Coral Bits Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 11,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: contracts.cakeBnbLp,
    tokenSymbol: 'CAKE',
    tokenAddresses: contracts.cake,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.cake[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.cake[97]}`,
    },
    displayName: 'Kelp Cupcakes Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 12,
    lpSymbol: 'AUTO-BNB LP',
    lpAddresses: contracts.autoBnbLp,
    tokenSymbol: 'AUTO',
    tokenAddresses: contracts.auto,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.auto[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.auto[97]}`,
    },
    displayName: 'Kelp Shake Pool',
    isCommunity: true,
    depositFee: 400,
  },
  {
    pid: 15,
    lpSymbol: 'FUEL-BNB LP',
    lpAddresses: contracts.fuelBnbLp,
    tokenSymbol: 'FUEL',
    tokenAddresses: contracts.fuel,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/add/ETH/${contracts.fuel[56]}`,
      97: `https://www.streetswap.vip/#/add/BNB/${contracts.fuel[97]}`,
    },
    displayName: 'Sailors Surprise Pool',
    isCommunity: true,
    depositFee: 400
  },
  {
    pid: 16,
    lpSymbol: QuoteToken.WBNB,
    lpAddresses: contracts.bnbBusdLp,
    tokenSymbol: 'WBNB',
    tokenAddresses: contracts.wbnb,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.wbnb[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.wbnb[97]}`,
    },
    displayName: 'WBNB Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 17,
    lpSymbol: QuoteToken.BUSD,
    lpAddresses: contracts.krustyBusdLp,
    tokenSymbol: 'BUSD',
    tokenAddresses: contracts.busd,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.busd[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.busd[97]}`,
    },
    displayName: 'BUSD Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 18,
    lpSymbol: QuoteToken.ETH,
    lpAddresses: contracts.ethBusdLp,
    tokenSymbol: 'ETH',
    tokenAddresses: contracts.eth,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.eth[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.eth[97]}`,
    },
    displayName: 'ETH Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 19,
    lpSymbol: QuoteToken.BTCB,
    lpAddresses: contracts.btcbBnbLp,
    tokenSymbol: 'BTCB',
    tokenAddresses: contracts.btcb,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.btcb[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.btcb[97]}`,
    },
    displayName: 'BTCB Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 26,
    lpSymbol: QuoteToken.DOT,
    lpAddresses: contracts.dotBusdLp,
    tokenSymbol: 'DOT',
    tokenAddresses: contracts.dot,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.dot[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.dot[97]}`,
    },
    displayName: 'DOT Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 20,
    lpSymbol: QuoteToken.ADA,
    lpAddresses: contracts.adaBusdLp,
    tokenSymbol: 'ADA',
    tokenAddresses: contracts.ada,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.ada[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.ada[97]}`,
    },
    displayName: 'ADA Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 21,
    lpSymbol: QuoteToken.USDT,
    lpAddresses: contracts.usdtBusdLp,
    tokenSymbol: 'USDT',
    tokenAddresses: contracts.usdt,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.usdt[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.usdt[97]}`,
    },
    displayName: 'USDT Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 22,
    lpSymbol: QuoteToken.DAI,
    lpAddresses: contracts.daiBusdLp,
    tokenSymbol: 'DAI',
    tokenAddresses: contracts.dai,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.dai[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.dai[97]}`,
    },
    displayName: 'DAI Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 23,
    lpSymbol: QuoteToken.USDC,
    lpAddresses: contracts.usdcBusdLp,
    tokenSymbol: 'USDC',
    tokenAddresses: contracts.usdc,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.usdc[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.usdc[97]}`,
    },
    displayName: 'USDC Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 24,
    lpSymbol: QuoteToken.CAKE,
    lpAddresses: contracts.cakeBusdLp,
    tokenSymbol: 'CAKE',
    tokenAddresses: contracts.cake,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.cake[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.cake[97]}`,
    },
    displayName: 'CAKE Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 25,
    lpSymbol: QuoteToken.AUTO,
    lpAddresses: contracts.autoBusdLp,
    tokenSymbol: 'AUTO',
    tokenAddresses: contracts.auto,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.auto[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.auto[97]}`,
    },
    displayName: 'AUTO Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
  {
    pid: 13,
    lpSymbol: QuoteToken.FUEL,
    lpAddresses: contracts.fuelBusdLp,
    tokenSymbol: 'FUEL',
    tokenAddresses: contracts.fuel,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    lpAddUrl: {
      56: `${lpAddBaseUrl}/#/swap?outputCurrency=${contracts.fuel[56]}`,
      97: `https://www.streetswap.vip/#/swap?outputCurrency=${contracts.fuel[97]}`,
    },
    displayName: 'FUEL Pool',
    isCommunity: true,
    depositFee: 400,
    isSingleAsset: true
  },
]

export default farms
