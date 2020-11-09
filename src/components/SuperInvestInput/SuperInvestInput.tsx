import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import InputSuper, { InputSuperProps } from '../InputSuper'

interface TokenInputSuperProps extends InputSuperProps {
  symbol: string,
  onSelectMax?: () => void,
}

const TokenInput: React.FC<TokenInputSuperProps> = ({
  symbol,
  onChange,
  onSelectMax,
  value,
}) => {
  return (
    <StyledTokenInput>
      <StyledMaxText>Give the Wizard some ETH </StyledMaxText>
      <InputSuper
        endAdornment={(
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>ETH</StyledTokenSymbol>
          </StyledTokenAdornmentWrapper>
        )}
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  )
}

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div`

`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${props => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-weight: 700;
`

export default TokenInput