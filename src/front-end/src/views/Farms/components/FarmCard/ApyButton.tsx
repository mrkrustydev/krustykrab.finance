import React from 'react'
import BigNumber from 'bignumber.js'
import ApyCalculatorModal from './ApyCalculatorModal'
import { CalculateIcon, IconButton, useModal } from '../../../../pancake-uikit/src'

export interface ApyButtonProps {
  lpLabel?: string
  krustyPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, krustyPrice, apy, addLiquidityUrl }) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal lpLabel={lpLabel} krustyPrice={krustyPrice} apy={apy} addLiquidityUrl={addLiquidityUrl} />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px">
      <CalculateIcon />
    </IconButton>
  )
}

export default ApyButton
