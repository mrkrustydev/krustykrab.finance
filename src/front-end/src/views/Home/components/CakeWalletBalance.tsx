import React from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getKrustyAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'
import { Text } from '../../../pancake-uikit/src'

const CakeWalletBalance = () => {
  const TranslateString = useI18n()
  const esproBalance = useTokenBalance(getKrustyAddress())
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue value={getBalanceNumber(esproBalance)} fontSize="24px" />
}

export default CakeWalletBalance
