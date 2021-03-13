import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useGetBlockCountdown } from 'hooks/useGetBlockCountdown'
import { Card, CardBody, Heading, Skeleton, Text } from '../../../pancake-uikit/src'

const StyledBlockchainRewardsCountdownCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  border-style:none;
  border-width:1px;
  border-color:red;
  box-shadow:none;
`

const BlockchainRewardsCountdownCard = () => {
  const TranslateString = useI18n()
  const data = useGetBlockCountdown()

  return (
    <StyledBlockchainRewardsCountdownCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Countdown To Rewards')}
        </Heading>
        {data ? (
          <>
            
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledBlockchainRewardsCountdownCard>
  )
}

export default BlockchainRewardsCountdownCard
