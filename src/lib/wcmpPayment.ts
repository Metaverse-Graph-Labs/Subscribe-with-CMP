import { Provider } from '@wagmi/core'
import { BigNumber, ethers, Signer } from 'ethers'
import { useState } from 'react'
import { useContractWrite, useSigner } from 'wagmi'
import { getContract, getProvider } from 'wagmi/actions'
import { MAIN_WCMP_PAYMENT_ADDRESS } from './consts'
import { Subscription } from './types/CMPPayment'

export const WCMP_PAYMENT_ABI = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
		],
		name: 'cancel',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'frequency',
				type: 'uint256',
			},
		],
		name: 'createPlan',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'subscriber',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
		],
		name: 'pay',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'subscriber',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
		],
		name: 'payCMP',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'date',
				type: 'uint256',
			},
		],
		name: 'PaymentSent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'merchant',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'date',
				type: 'uint256',
			},
		],
		name: 'PlanCreated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'merchant',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'date',
				type: 'uint256',
			},
		],
		name: 'PlanUpdated',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
		],
		name: 'subscribe',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'subscriber',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'date',
				type: 'uint256',
			},
		],
		name: 'SubscriptionCancelled',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'subscriber',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'date',
				type: 'uint256',
			},
		],
		name: 'SubscriptionCreated',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'planId',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'merchant',
				type: 'address',
			},
		],
		name: 'updatePlan',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'nextPlanId',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'plans',
		outputs: [
			{
				internalType: 'address',
				name: 'merchant',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'frequency',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'subscriptions',
		outputs: [
			{
				internalType: 'address',
				name: 'subscriber',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'start',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'nextPayment',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
]

let signer: any

export const setSigner = (_signer: Signer) => {
	signer = _signer
}
export const getContractInstance = (): ethers.Contract => {
	const provider = getProvider()

	const wcmpContract = getContract({
		address: MAIN_WCMP_PAYMENT_ADDRESS,
		abi: WCMP_PAYMENT_ABI,
		signerOrProvider: provider,
	})
	return wcmpContract
}

export const getContractInstanceWithSigner = (): ethers.Contract => {
	const wcmpContract = getContract({
		address: MAIN_WCMP_PAYMENT_ADDRESS,
		abi: WCMP_PAYMENT_ABI,
		signerOrProvider: signer,
	})
	return wcmpContract
}

export const createPlan = async (token: string, amount: number | BigNumber, frequency: number) => {
	console.log('createPlan', token, amount.toString(), frequency.toString())
	const wcmpContract = getContractInstanceWithSigner()
	console.log('wcmpContract', wcmpContract)
	const tx = await wcmpContract.createPlan(token, amount.toString(), frequency.toString())
	return tx
}

export const updatePlan = async (planId: string | number, merchant: string) => {
	const wcmpContract = getContractInstanceWithSigner()
	const tx = await wcmpContract.updatePlan(planId, merchant)
	return tx
}

export const subscribe = async (planId: number) => {
	const wcmpContract = getContractInstanceWithSigner()
	const tx = await wcmpContract.subscribe(planId)
	return tx
}

export const cancelSubscription = async (planId: number) => {
	const wcmpContract = getContractInstanceWithSigner()
	const tx = await wcmpContract.cancel(planId)
	return tx
}

export const pay = async (planId: number) => {
	const wcmpContract = getContractInstanceWithSigner()
	const tx = await wcmpContract.pay(planId)
	return tx
}

export const payCMP = async (planId: number) => {
	const wcmpContract = getContractInstanceWithSigner()
	const tx = await wcmpContract.payCMP(planId)
	return tx
}

export const cancel = async (planId: number) => {
	const wcmpContract = getContractInstanceWithSigner()
	const tx = await wcmpContract.cancel(planId)
	return tx
}

export const getPlans = async () => {
	const wcmpContract = getContractInstance()
	const plans = await wcmpContract.plans()
	return plans
}

export const getSubscriptions = async (address: string) => {
	const wcmpContract = getContractInstance()
	const subscriptions = await wcmpContract.subscriptions(address)
	return subscriptions
}

export const getPlan = async (planId: number) => {
	const wcmpContract = getContractInstance()
	const plan = await wcmpContract.plans(planId)
	return plan
}

export const getSubscription = async (address: string, planId: number): Promise<Subscription> => {
	const wcmpContract = getContractInstance()
	const subscription = await wcmpContract.subscriptions(address, planId)
	return subscription
}

export const getNextPlanId = async () => {
	const wcmpContract = getContractInstance()
	const planId = await wcmpContract.nextPlanId()
	return planId
}

export const signMessage = async (message: string) => {
	const signature = await signer.signMessage(message)
	return signature
}

export const verifyMessage = async (message: string, signature: string) => {
	const address = await ethers.utils.verifyMessage(message, signature)
	return address
}
