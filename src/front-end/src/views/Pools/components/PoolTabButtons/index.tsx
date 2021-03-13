import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import { ButtonMenu, ButtonMenuItem } from '../../../../pancake-uikit/src'

const PoolTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={!isExact ? 1 : 0} size="sm" variant="primary">
        <ButtonMenuItem style={{backgroundColor:isExact?'#4764c5':'#e7e8fc',color:isExact?'#ffffff':'#3f3f3f'}} as={Link} to={`${url}`}>
          {TranslateString(999, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem style={{backgroundColor:!isExact?'#4764c5':'#e7e8fc',color:!isExact?'#ffffff':'#3f3f3f'}} as={Link} to={`${url}/history`}>
          {TranslateString(999, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`
