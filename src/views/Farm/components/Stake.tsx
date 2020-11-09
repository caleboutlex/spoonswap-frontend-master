import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useAllowance from '../../../hooks/useAllowance'
import useAllowanceWizard from '../../../hooks/useAllowanceWizard'
import useApprove from '../../../hooks/useApprove'
import useApproveTokenToWiz from '../../../hooks/useApproveTokenToWiz'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import useSuperinvest from '../../../hooks/useSuperinvest'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import SuperinvestModal from './SuperinvestModal'
import UnspellModal from './UnspellModal'
import ApproveWizardModal from './ApproveWizardModal'
import useUnspell from '../../../hooks/useUnspell'
import useApproveWizard from '../../../hooks/useApproveWizard'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string
}




const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)

  const allowance = useAllowance(lpContract)
  const unspellallowance = useAllowanceWizard(lpContract)

  const { onApprove } = useApprove(lpContract)

  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBalance(pid)

  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const { onSuperinvest } = useSuperinvest(lpContract)
  const { onUnspell } = useUnspell(lpContract)

  const { onApproveWizard } = useApproveWizard(lpContract)
  const { onApproveTokenToWizard } = useApproveTokenToWiz(lpContract)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
    />,
  )

  const [onPresentSuperinvest] = useModal(
    <SuperinvestModal
      onConfirm={onSuperinvest}
      tokenName={tokenName}
    />,
  )

  const [onPresentunspell] = useModal(
    <UnspellModal
      max={tokenBalance}
      onConfirm={onUnspell}
      tokenName={tokenName}
    />,
  )

  const [onPresentApproveWizard] = useModal(
    <ApproveWizardModal
      max={tokenBalance}
      onConfirm={onApproveWizard}
      tokenName={tokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])


  
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🍲</CardIcon>
            <Value value={getBalanceNumber(stakedBalance)} />
            <Label text={`${tokenName} Tokens Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
          
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={`Approve ${tokenName}`}
              />
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0))}
                  text="Unstake LP Tokens"
                  onClick={onPresentWithdraw}
                />
                <StyledActionSpacer />
                <IconButton onClick={onPresentDeposit}>
                  <AddIcon />
                </IconButton>
              </>
            )}

          </StyledCardActions>

          <StyledActionSpacer />
          {!unspellallowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={onPresentApproveWizard}
                text={`Approve the wizard`}
              />
            ) : (
              <>
              <Button text=' ⚗️ Cast a spell' onClick={onPresentSuperinvest} />
              <StyledActionSpacer />
              <Button text=' 🙏 Break the spell' onClick={onPresentunspell} />
                <StyledActionSpacer />
                
              </>
            )}
          <StyledActionSpacer />
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[2]}px;
  width: ${(props) => props.theme.spacing[2]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Stake
