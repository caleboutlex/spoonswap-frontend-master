import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/logo.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={logo} height={120} />}
        title=" SpoonSwap!"
        subtitle="Sorcery is the sauce fools spoon over failure to hide the flavor of their own incompetence. --George R. R. Martin aka Chad"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        👴🏾<b>Pro Tip</b>: Don't be a chad ! 
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text=" 👉🏼  See the Menu" to="/farms" variant="secondary" />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[800]};
  font-size: 46px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[800]};
  }
`

export default Home
