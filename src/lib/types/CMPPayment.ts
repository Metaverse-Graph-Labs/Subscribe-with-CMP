import { BigNumber } from 'ethers'

export interface Plan {
	id: number
	amount: BigNumber
	frequency: BigNumber
	merchant: string
	token: string
}
