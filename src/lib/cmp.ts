import { ethers } from 'ethers'
import { getProvider } from 'wagmi/actions'
import { MAIN_WCMP_ADDRESS } from './consts'
import { WCMP_ABI } from './wcmp'

const get_contract = (): ethers.Contract => {
	const provider = getProvider()
	const wcmpContract = new ethers.Contract(MAIN_WCMP_ADDRESS, WCMP_ABI, provider)
	return wcmpContract
}

export const get_balance = async (address: string): Promise<string> => {
	const provider = getProvider()
	const balance = await provider.getBalance(address)
	return ethers.utils.formatEther(balance)
}

export const deposit = async (amount: string): Promise<ethers.providers.TransactionResponse> => {
	const wcmpContract = get_contract()
	const tx = await wcmpContract.deposit({ value: amount })
	return tx
}

export const allowance = async (owner: string, spender: string): Promise<string> => {
	const wcmpContract = get_contract()
	const allowance = await wcmpContract.allowance(owner, spender)
	return allowance.toString()
}

export const approve = async (spender: string, amount: string): Promise<ethers.providers.TransactionResponse> => {
	const wcmpContract = get_contract()
	const tx = await wcmpContract.approve(spender, amount)
	return tx
}
