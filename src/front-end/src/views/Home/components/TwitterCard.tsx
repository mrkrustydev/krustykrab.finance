import React, {useContext} from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import styled, {ThemeContext} from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import useI18n from 'hooks/useI18n'

const StyledTwitterCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 0px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const TwitterCard = () => {
  const TranslateString = useI18n()
  const theme = useContext(ThemeContext)
  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(10003, 'Announcements')}
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'KrustyKrabDefi'
          }}
          options={{
            height: '300',
            chrome: "noheader, nofooter",
            width: "400",
            borderColor:'#a1adee',
            theme:`${ theme.isDark? 'dark':'light'}`
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
