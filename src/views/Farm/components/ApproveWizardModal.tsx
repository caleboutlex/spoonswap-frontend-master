import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'

interface ApproveWizardModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
}

const ApproveWizardModal: React.FC<ApproveWizardModalProps> = ({
  onConfirm,
  onDismiss,
  max,
  tokenName = '',
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

 
  return (
    <Modal>
      <ModalTitle text={'Approve the Wizard so it can perform its magic 🔮'} />
      <Button
          disabled={pendingTx}
          text={pendingTx ? 'Approving... ' : 'Unleash the magic!'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        />
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
       
      </ModalActions>
    </Modal>
  )
}

export default ApproveWizardModal
