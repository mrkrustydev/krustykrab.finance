import styled from 'styled-components'
import Container from './Container'

const Page = styled(Container)`
  
  color: #ece0d1;
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;

  background-color:none;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

export default Page
