import { useContext } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'
import { ThemeContext } from 'contexts/ThemeContext'

const useTheme = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const theme = useContext(StyledThemeContext)

  
  theme.colors = 
  {
    primary: isDark?'#e7e8fc':'#000000',
    primaryBright: '#ffa500',
    primaryDark: '#38220f',
    secondary: isDark?'#919dde':'#4764c5',
    tertiary: isDark?'#515d9e':'#c1cdff',
    success: '#4b0082',
    failure: '#ee82ee',
    warning: '#4ba9fb',
    contrast: '#7ac4f7',
    invertedContrast: isDark?'#223872':'#a1adee',
    input: '#66779e',
    background: isDark?'#122862':'#d3d4f3',
    backgroundDisabled: isDark?'#090909':'#909090',
    text: isDark?'#e7e8fc':'#223872',
    textDisabled: isDark?'#d0d0d0':'#090909',
    textSubtle: isDark?'#ff8b67':'#b13f26',
    borderColor: '#dc2b2b',
    card: '#e7e8fc',
    binance: '#c0d000',
    gradients: {
      bubblegum: ''
    }
  } 

  theme.nav.background = theme.colors.invertedContrast;

  return { isDark, toggleTheme, theme }
}

export default useTheme
