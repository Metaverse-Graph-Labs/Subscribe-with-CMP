import { BigNumber } from 'ethers'

export interface Plan {
	id: number
	amount: BigNumber
	frequency: BigNumber
	merchant: string
	token: string
	subscription?: Subscription
}

export interface Subscription {
	subscriber: string
	start: number
	nextPayment: number
}
