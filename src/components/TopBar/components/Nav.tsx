import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Menu
      </StyledLink>
      <StyledAbsoluteLink
        href="#"
        target="_blank"
      >
        About
      </StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[950]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[5]}px;
  padding-right: ${(props) => props.theme.spacing[5]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[200]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[950]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[5]}px;
  padding-right: ${(props) => props.theme.spacing[5]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[200]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[5]}px;
    padding-right: ${(props) => props.theme.spacing[5]}px;
  }
`

export default Nav
