import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approveTokenToWiz, getSushiContract, getDefiWizardContract } from '../sushi/utils'

const useApproveTokenToWizard = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getDefiWizardContract(sushi)

  const handleApproveTokenToWizard = useCallback(async () => {
    try {
      const tx = await approveTokenToWiz(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApproveTokenToWizard: handleApproveTokenToWizard }
}

export default useApproveTokenToWizard
