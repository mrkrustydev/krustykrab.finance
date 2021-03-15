import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import {Grid, Col, Row } from 'react-flexbox-grid'
import { Heading, Text, BaseLayout, Svg } from '../../pancake-uikit/src'
import useTheme from '../../hooks/useTheme'
import TwitterCard from './components/TwitterCard'


const Hero = styled.div`
  align-items: center;

  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  border-radius:24px;
  

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/landing-meat.png'), url('/landing-meat-right.png');
    background-position: left center, right center;
    height: 200px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  

  & > div {
    grid-column: span 6;
    width: 100%;
  }


  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;
  
  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const {isDark} = useTheme();
  return (
    <Page>
      <div>
        <Grid >
          <Row style={{justifyContent:'stretch'}}>
            <Col xs={16} md={6} className='colStyles' >
              <FarmStakingCard />
            </Col>
            <Col xs={16} md={6} className='colStyles'>
              <TwitterCard />
            </Col>
          </Row>
          <Row style={{ justifyContent: 'stretch' }}>
            <Col xs={16} md={6} className='colStyles' >
              <CakeStats />
            </Col>
            <Col xs={16} md={6} className='colStyles'>
              <TotalValueLockedCard />
            </Col>
          </Row>
        </Grid>
      </div>
    </Page>
  )
}

export default Home
