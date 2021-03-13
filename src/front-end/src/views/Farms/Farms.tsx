import React, { useEffect, useCallback } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { BLOCKS_PER_YEAR, KRUSTY_PER_BLOCK, KRUSTY_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceKrustyBusd, usePriceBnbBusd, usePriceEthBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'
import { Image, Heading } from '../../pancake-uikit/src'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const krustyPrice = usePriceKrustyBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const ethPriceUsd = usePriceEthBusd()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback((farmsToDisplay, removed: boolean) => {
      const krustyPriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === KRUSTY_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }

        console.log(farm)
        console.log(`bnb price: ${bnbPrice}`)
        console.log(`krustyPrice: ${krustyPrice}`)
        console.log(`krustyPriceVsBNB: ${krustyPriceVsBNB}`)

        const krustyRewardPerBlock = KRUSTY_PER_BLOCK.times(new BigNumber(farm.poolWeight)) // .div(new BigNumber(10).pow(18))
        const krustyRewardPerYear = krustyRewardPerBlock.times(BLOCKS_PER_YEAR)

        console.log(`krustyRewardPerBlock: ${krustyRewardPerBlock}`)
        console.log(`krustyRewardPerYear: ${krustyRewardPerYear}`)

        let apy = krustyPrice.times(krustyRewardPerYear);
        console.log(`${farm.lpSymbol} apy: ${apy}`)

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);
        console.log(`totalValue: ${totalValue}`)

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice);

          console.log(`totalValueBNB: ${totalValue}`)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue);
        }

        console.log(`${farm.lpSymbol} apy: ${apy}`)

        return { ...farm, apy }
      })

      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          krustyPrice={krustyPrice}
          ethPrice={ethPriceUsd}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [farmsLP, bnbPrice, ethPriceUsd, krustyPrice, ethereum, account],
  )

  return (
    <Page>
      <FarmTabButtons />
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
      </div>
    </Page>
  )
}

export default Farms
