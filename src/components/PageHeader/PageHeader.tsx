import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledSpacer/>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  width: 120px;
`

const StyledTitle = styled.h1`
  font-family: 'Kaushan Script', sans-serif;
  color: ${(props) => props.theme.color.grey[800]};
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[800]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`
const StyledSpacer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[8]}px;
  justify-content: flex-end;
`

export default PageHeader
