import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { calculateKrustyEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'
import { Modal, Text, LinkExternal, Flex } from '../../../../pancake-uikit/src'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  krustyPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  krustyPrice,
  apy,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const farmApy = apy.times(new BigNumber(100)).toNumber()
  const oneThousandDollarsWorthOfKrusty = 1000 / krustyPrice.toNumber()

  const krustyEarnedPerThousand1D = calculateKrustyEarnedPerThousandDollars({ numberOfDays: 1, farmApy, krustyPrice })
  const krustyEarnedPerThousand7D = calculateKrustyEarnedPerThousandDollars({ numberOfDays: 7, farmApy, krustyPrice })
  const krustyEarnedPerThousand30D = calculateKrustyEarnedPerThousandDollars({ numberOfDays: 30, farmApy, krustyPrice })
  const krustyEarnedPerThousand365D = calculateKrustyEarnedPerThousandDollars({ numberOfDays: 365, farmApy, krustyPrice })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'BUSD EARNED per $1000')}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: krustyEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfKrusty })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{krustyEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: krustyEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfKrusty })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{krustyEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: krustyEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfKrusty })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{krustyEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: krustyEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfKrusty })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{krustyEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {TranslateString(
          999,
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
      <Flex justifyContent="center">
        <LinkExternal href={addLiquidityUrl}>
          {TranslateString(999, 'Get')} {lpLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
