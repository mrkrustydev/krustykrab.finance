import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import state from 'state'
import { usePriceBnbBusd, useFarms } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import fetchFarms from 'state/farms/fetchFarms'
import { fetchFarmsPublicDataAsync } from 'state/farms/index'
import { Card, CardBody, Heading, Text } from '../../../pancake-uikit/src'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  border-style:none;
  border-width:1px;
  border-color:red;
  box-shadow:none;
`

const TotalValueLockedCard = () => {
  const fmt = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: ''
  }

  const bnbPrice = usePriceBnbBusd()
  const TranslateString = useI18n()
  

  
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
      dispatch(fetchFarmsPublicDataAsync())
  }, [dispatch, fastRefresh])

  const farms = useFarms()
  const totalValuLocked = useCallback((farmsToInclude, quoteTokenPrice) => {
    let tvl = new BigNumber(0)
    farmsToInclude.forEach((farm) => {
        let liquidity = new BigNumber(farm.lpTotalInQuoteToken)
        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          liquidity = liquidity.times(quoteTokenPrice)
        } 
        tvl = tvl.plus(liquidity)
      })
      return tvl
    },
    []
  )

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        <Heading size="xl">{`$${totalValuLocked(farms, bnbPrice).toFormat(2, fmt).toString()}`}</Heading>
        <Text color="textSubtle">{TranslateString(999, 'Across all LPs and KRUSTY Pools')}</Text>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
