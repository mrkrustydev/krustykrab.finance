import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '../pancake-uikit/src'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color:#a1adee;
   

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .rowStyles{
    margin-top:2vh;
    
    
    flex:1;
  }
  .colStyles{
    align-content:stretch;
    margin-top:2vh;
  }
  .unlockButton{
    background-color:#4764c5!important;

  }
  .unlockButton:hover{
    background-color:#818dce!important;

  }
  .cancelButton{
    background-color:#4764c5!important;

  }
  .cancelButton:hover{
    background-color:#818dce!important;
 
  }
`

export default GlobalStyle
