import { BigNumber, ethers, providers, Signer } from 'ethers'
import { getProvider, getContract } from 'wagmi/actions'
import { MAIN_WCMP_ADDRESS } from './consts'

export const WCMP_ABI = [
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'src', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'who', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Approval',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'dst', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Deposit',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'src', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'dst', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Transfer',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'src', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Withdrawal',
		type: 'event',
	},
	{
		inputs: [
			{ internalType: 'address', name: '', type: 'address' },
			{ internalType: 'address', name: '', type: 'address' },
		],
		name: 'allowance',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'who', type: 'address' },
			{ internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'approve',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'decimals',
		outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
		stateMutability: 'view',
		type: 'function',
	},
	{ inputs: [], name: 'deposit', outputs: [], stateMutability: 'payable', type: 'function' },
	{
		inputs: [],
		name: 'name',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'dst', type: 'address' },
			{ internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'transfer',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'src', type: 'address' },
			{ internalType: 'address', name: 'dst', type: 'address' },
			{ internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'transferFrom',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{ stateMutability: 'payable', type: 'receive' },
]

let signer: any

export const setSigner = (_signer: Signer) => {
	signer = _signer
}

export const getContractInstance = (): ethers.Contract => {
	const provider = getProvider()
	// console.log('Provide: ', provider)
	// const wcmpContract = getContract({
	// 	address: MAIN_WCMP_ADDRESS,
	// 	abi: WCMP_ABI,
	// 	signerOrProvider: provider,
	// })
	// return wcmpContract
	return new ethers.Contract(MAIN_WCMP_ADDRESS, WCMP_ABI, signer)
}

export const getBalance = async (address: string): Promise<BigNumber> => {
	const wcmpContract = getContractInstance()
	const balance = await wcmpContract.balanceOf(address)
	return balance
}

export const transfer = async (to: string, amount: string): Promise<providers.TransactionResponse> => {
	const wcmpContract = getContractInstance()
	const tx = await wcmpContract.transfer(to, amount)
	return tx
}

export const approve = async (spender: string, amount: string | BigNumber): Promise<providers.TransactionResponse> => {
	const wcmpContract = getContractInstance()
	const tx = await wcmpContract.approve(spender, amount)
	return tx
}

export const allowance = async (owner: string, spender: string): Promise<string> => {
	const wcmpContract = getContractInstance()
	const allowance = await wcmpContract.allowance(owner, spender)
	return allowance.toString()
}

export const deposit = async (amount: string | BigNumber): Promise<providers.TransactionResponse> => {
	const wcmpContract = getContractInstance()
	const tx = await wcmpContract.deposit({ value: amount })
	return tx
}

export const withdraw = async (amount: string): Promise<providers.TransactionResponse> => {
	const wcmpContract = getContractInstance()
	const tx = await wcmpContract.withdraw(amount)
	return tx
}

export const transferFrom = async (
	from: string,
	to: string,
	amount: string
): Promise<providers.TransactionResponse> => {
	const wcmpContract = getContractInstance()
	const tx = await wcmpContract.transferFrom(from, to, amount)
	return tx
}
