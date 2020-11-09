import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { spellETH, getDefiWizardContract } from '../sushi/utils'

const useSuperinvest = (lpContract: Contract) => {
  const { account } = useWallet()
  const sushi = useSushi()
  
  const handleSuperinvest = useCallback(
    async (amount: string) => {
      const txHash = await spellETH(
        getDefiWizardContract(sushi),
        lpContract,  
        amount, 
        account
      )
      console.log(txHash)
    },
    [account, lpContract, sushi],
  )

  return { onSuperinvest: handleSuperinvest }
}

export default useSuperinvest
