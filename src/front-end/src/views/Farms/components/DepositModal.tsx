import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'
import { Button, Modal, LinkExternal } from '../../../pancake-uikit/src'


const Paragraph = styled.p`
color: ${({ theme }) => theme.isDark ? "#ff5b37" : "#b13f26"};
text-align: right;
`

const FinePrint = styled.div`
margin-top: 5px;
`

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
  depositFee?: number
  isSingleAsset?: boolean
}

const ONE = new BigNumber(1)

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '', addLiquidityUrl, depositFee, isSingleAsset }) => {
  const [val, setVal] = useState('')
  const [fee, setFee] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
      if (depositFee) {
        const depFee = formatDepositFee(depositFee, e.currentTarget.value)
        setFee(depFee)
      }
    },
    [setVal, setFee, depositFee],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
    if (depositFee) {
      const depFee = formatDepositFee(depositFee, fullBalance)
      setFee(depFee)
    }
  }, [fullBalance, setVal, setFee, depositFee])

  const formatDepositFee = (f: number, b: string) => {
    const deposit = new BigNumber(b)
    const depFee = deposit.times(f).div(10000)
    let depFeeStr = depFee.toFixed(6)
    if (depFee.gte(ONE))
      depFeeStr = depFee.toFixed(3)
    
    return depFeeStr
  }

  return (
    <Modal 
      title={
        isSingleAsset ?
          TranslateString(999, 'Stake tokens') 
        : TranslateString(999, 'Stake LP tokens')
      } 
      onDismiss={onDismiss}>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
        inputTitle={TranslateString(999, 'Stake')}
      />
      {depositFee && val ? 
        <FinePrint>
          <Paragraph>{TranslateString(999, 'Deposit Fee: ')} {fee} {tokenName}</Paragraph>
          <Paragraph>{TranslateString(999, 'This fee will be used 100% for buyback and burn.')}</Paragraph>
        </FinePrint>
        :
        <></>
      }
      <ModalActions>
        <Button variant="secondary" className='unlockButton' onClick={onDismiss} fullWidth>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          fullWidth
          disabled={pendingTx || fullBalance === '0' || val === '0'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
          className='unlockButton'
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
      <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
        {TranslateString(999, 'Get')} {tokenName}
      </LinkExternal>
    </Modal>
  )
}

export default DepositModal
