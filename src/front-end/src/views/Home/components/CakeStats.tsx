import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { KRUSTY_PER_BLOCK, BASE_BUY_TOKEN_URL } from 'config/index'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getKrustyAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { Card, CardBody, Heading, Text, LinkExternal } from '../../../pancake-uikit/src'
import TotalValueLockedCard from './TotalValueLockedCard'

/* Background Image for stats - There are some positioning related issues to fix
  background-image: url('/images/espro-sftm-chart-transparent.png');
  background-size: 50%;
 */

const StyledCakeStats = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`

const Row = styled.div`
  align-items: center;
  display: inline;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getKrustyAddress())
  const krustySupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const krustyPerBlock = new BigNumber(KRUSTY_PER_BLOCK)
  const buyKrustyUrl = `${BASE_BUY_TOKEN_URL}?outputCurrency=${getKrustyAddress()}`

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="18px">
          {TranslateString(534, 'Krusty Krab Stats')}
        </Heading>
        <Row style={{display:'inline-flex', width:'100%'}}>
          <Text fontSize="14px" style={{width:'40%', display:'inline-flex'}}>
            {TranslateString(536, 'Total KRUSTY Supply')}
          </Text>
          {krustySupply && 
          <div style={{width:'auto', display:'inline-flex'}}>
            <CardValue fontSize="14px" value={krustySupply} />
          </div>
          }
        </Row>
        <br/>
        <Row style={{display:'inline-flex', width:'100%'}}>
          <Text style={{width:'40%', display:'inline-flex'}} fontSize="14px">{TranslateString(540, 'New KRUSTY/block')}</Text>
          <div style={{width:'auto', display:'inline-flex'}}>
            <CardValue fontSize="14px" decimals={1} value={krustyPerBlock.toNumber()} />
          </div>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
