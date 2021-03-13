import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const KRUSTY_PER_BLOCK = new BigNumber(4)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BSC_BLOCK_TIME = 3
export const KRUSTY_POOL_PID = 1
export const BASE_EXCHANGE_URL = 'https://exchange.pancakeswap.finance'
export const BASE_EXCHANGE_URL_STREETSWAP = 'https://swap.thugs.fi'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const BASE_ADD_LIQUIDITY_URL_STREETSWAP = `${BASE_EXCHANGE_URL_STREETSWAP}/#/add`
export const BASE_LIQUIDITY_POOL_URL_STREETSWAP = `${BASE_EXCHANGE_URL_STREETSWAP}/#/pool`
export const BASE_BUY_TOKEN_URL = `${BASE_EXCHANGE_URL}/#/swap`
