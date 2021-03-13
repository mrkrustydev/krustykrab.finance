import React from 'react'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { Heading, Text } from '../../../pancake-uikit/src'

const WalletNotConnected = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <Heading size="xl" mb="8px">
        {TranslateString(999, 'Oops!')}
      </Heading>
      <Text as="p" mb="16px">
        {TranslateString(999, 'Please connect your wallet to continue')}
      </Text>
      <UnlockButton />
    </div>
  )
}

export default WalletNotConnected
