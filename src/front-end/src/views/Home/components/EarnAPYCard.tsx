import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceBnbBusd } from 'state/hooks'
import { BLOCKS_PER_YEAR, KRUSTY_PER_BLOCK, KRUSTY_POOL_PID } from 'config'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '../../../pancake-uikit/src'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const bnbPrice = usePriceBnbBusd()

  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

    calculateAPY(activeFarms)

    return (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      const krustyPriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === KRUSTY_POOL_PID)?.tokenPriceVsQuote || 0)

      farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const krustyRewardPerBlock = KRUSTY_PER_BLOCK.times(farm.poolWeight)
        const krustyRewardPerYear = krustyRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = krustyPriceVsBNB.times(krustyRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
          apy = krustyPriceVsBNB.times(krustyRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.KRUSTY) {
          apy = krustyRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const krustyApy =
            farm && krustyPriceVsBNB.times(krustyRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = krustyApy && dualApy && krustyApy.plus(dualApy)
        }

        if (maxAPY.current < apy.toNumber()) maxAPY.current = apy.toNumber()

        return apy
      })
    },
    [bnbPrice, farmsLP],
  )

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Earn up to
        </Heading>
        <CardMidContent color="#7645d9">
          {getHighestAPY() ? (
            `${getHighestAPY()}% ${TranslateString(736, 'APY')}`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            in Farms
          </Heading>
          <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
