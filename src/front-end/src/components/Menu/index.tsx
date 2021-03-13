import React, { useContext } from 'react'

import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'

import { usePriceKrustyBusd, useProfile } from 'state/hooks'
import { Menu as UikitMenu } from '../../pancake-uikit/src/widgets/Menu'

import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const krustyPriceUsd = usePriceKrustyBusd()
  const { profile } = useProfile()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      krustyPriceUsd={krustyPriceUsd.toNumber()}
      links={config}
      profile={{
        username: profile?.username,
        // image: profile?.username ? `/images/nfts/logo.ico` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: false, // !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
