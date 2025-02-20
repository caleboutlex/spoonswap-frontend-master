import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approveWizard, getDefiWizardContract, getMasterChefContract } from '../sushi/utils'

const useApproveWizard = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getDefiWizardContract(sushi)

  const handleApproveWizard = useCallback(async () => {
    try {
      const tx = await approveWizard(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApproveWizard: handleApproveWizard }
}

export default useApproveWizard
