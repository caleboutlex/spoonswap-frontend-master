import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import SuperInvestInput from '../../../components/SuperInvestInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import styled from 'styled-components'

interface SuperInvestModal extends ModalProps {
  onConfirm: (amount: string) => void
  tokenName?: string
}


const SuperInvestModal: React.FC<SuperInvestModal> = ({
  onConfirm,
  onDismiss,
  tokenName = 'cEth',
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingTx2, setPendingTx2] = useState(false)
  const fullBalance = useMemo(() => {
  }, [])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  


  return (
    <Modal>
      <StyledActionSpacer/>
      <StyledTitle> 🧙‍♂️ </StyledTitle>
      <ModalTitle text="Welcome to the Defi Wizard menu!" />
      <StyledActionSpacer/>
      <StyledSubtitle>Give the wizard some ETH and it will cast a spell on it</StyledSubtitle>
      <StyledActionSpacer/>
      <Styleddiv>If the Wizard can't cast any spell's it will still do it's magic giving you {tokenName} tokens. The amount of underlying tokens the wizard uses depends on the amount of ETH you give it !</Styleddiv>
      <StyledActionSpacer/>
      <StyledSubtitle> 👇 Watch out ! 👇 </StyledSubtitle>
      <StyledActionSpacer/>
      <StyledSubtitle> You need to approve the underlying token to the Wizard first !</StyledSubtitle>
      <StyledActionSpacer/>
      <StyledInfo> Wizard Contract Address: 0x008f7bB5F6e0e18774df3c1348550646c4C11B2a </StyledInfo>
      <SuperInvestInput
        value={val}
        onChange={handleChange}
        symbol={tokenName}
      />
       <StyledActionSpacer/>
      <Button
          disabled={pendingTx}
          text={pendingTx ? 'Pending superinvestment' : '⚗️ ABRACADEFI '}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        />
      <StyledActionSpacer/>
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
      
      </ModalActions>
    </Modal>
  )
}

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[3]}px;
  width: ${(props) => props.theme.spacing[3]}px;
`
const Styleddiv = styled.h3`
  color: ${(props) => props.theme.color.grey[800]};
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  margin: 0;
  padding: 0;
`
const StyledTitle = styled.h1`
  font-size: 136px;
  text-align: center;
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

const StyledInfo = styled.h4`
  color: ${(props) => props.theme.color.grey[800]};
  font-size: 11px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`
export default SuperInvestModal
