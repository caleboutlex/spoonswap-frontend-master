import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getDefiWizardContract } from '../sushi/utils'

const useAllowanceWizard = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getDefiWizardContract(sushi)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      masterChefContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, masterChefContract, lpContract])

  useEffect(() => {
    if (account && masterChefContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, masterChefContract, lpContract])

  return allowance
}

export default useAllowanceWizard
