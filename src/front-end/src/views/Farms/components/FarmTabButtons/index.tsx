import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import { ButtonMenu, ButtonMenuItem } from '../../../../pancake-uikit/src'

const FarmTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()
  const location = useLocation()

  const isInPath = (term) => {
    return location.pathname.includes(term)
  }

  let index = 0
  if (isInPath('history'))
    index = 1

  return (
    <Wrapper>
      <ButtonMenu activeIndex={!isExact ? 1 : 0} size="sm" variant="primary">
        <ButtonMenuItem style={{backgroundColor:index===0?'#4764c5':'#e7e8fc',color:isExact?'#ffffff':'#3f3f3f'}}  as={Link} to={`${url}`}>
          {TranslateString(999, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem style={{backgroundColor:index===1?'#4764c5':'#e7e8fc',color:index===1?'#ffffff':'#3f3f3f'}}  as={Link} to={`${url}/history`}>
          {TranslateString(999, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`
