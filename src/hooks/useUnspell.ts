import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { unspellETH ,getDefiWizardContract } from '../sushi/utils'

const useUnspell = (lpContract: Contract) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const handleUnspell = useCallback(
    async (amount: string) => {
      const txHash = await unspellETH(
        getDefiWizardContract(sushi),
        lpContract,  
        amount, 
        account
      )
      console.log(txHash)
    },
    [account, lpContract, sushi],
  )

  return { onUnspell: handleUnspell }
}

export default useUnspell
