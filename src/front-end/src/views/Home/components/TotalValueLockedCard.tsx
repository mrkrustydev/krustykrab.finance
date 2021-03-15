import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import state from 'state'
import { usePriceBnbBusd, useFarms, useTotalValue } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import fetchFarms from 'state/farms/fetchFarms'
import { fetchFarmsPublicDataAsync } from 'state/farms/index'
import CardValue from './CardValue'
import { Card, CardBody, Heading, Text } from '../../../pancake-uikit/src'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  border-radius: 0px;
  border: 1px solid ${({ theme }) => theme.isDark ? "#ff5b37" : "#b13f26"};

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

  const TranslateString = useI18n()
  const totalValue = useTotalValue()

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        <CardValue value={totalValue.toNumber()} prefix="$" decimals={2} />
        <Text color="textSubtle">{TranslateString(999, 'Across all Farms and Pools')}</Text>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
