import React from 'react'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import HeaderWrapper from 'views/Profile/components/HeaderWrapper'
import NoProfileCard from './NoProfileCard'
import { Heading, Text } from '../../../pancake-uikit/src'

const TeamHeader = () => {
  const TranslateString = useI18n()
  const { isInitialized, profile } = useProfile()
  const showProfileCallout = isInitialized && !profile

  return (
    <>
      {showProfileCallout && <NoProfileCard />}
      <HeaderWrapper>
        <Heading as="h1" size="xxl" color="secondary">
          {TranslateString(999, 'Teams & Profiles')}
        </Heading>
        <Text bold>
          {TranslateString(
            999,
            'Show off your stats and collectibles with your unique profile. Team features will be revealed soon!',
          )}
        </Text>
      </HeaderWrapper>
    </>
  )
}

export default TeamHeader
