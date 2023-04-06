import Header from '@/components/Header'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import * as payment from '@/lib/wcmpPayment'
import * as wcmp from '@/lib/wcmp'
import { MAIN_WCMP_ADDRESS, MAIN_WCMP_PAYMENT_ADDRESS } from '@/lib/consts'
import { BigNumber, ethers, Signer } from 'ethers'
import { Plan } from '@/lib/types/CMPPayment'
interface ExceptionError extends Error {
	message: string
}

export default function CreateSubscription() {
	const signer = useSigner()
	const { isConnected, address } = useAccount()
	const [plan, setPlan] = useState<Plan>()
	const [totalPlans, setTotalPlans] = useState<number>(0)
	const [subscriptionCount, setSubscriptionCount] = useState<number>(1)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initData = async () => {
		console.log('Setting signer...', signer)
		payment.setSigner(signer.data as Signer)
		wcmp.setSigner(signer.data as Signer)
		const nextPlanId = (await payment.getNextPlanId()).toString()
		console.log({ nextPlanId })
		setTotalPlans(parseInt(nextPlanId))
		if (nextPlanId > 0) {
			loadPlan(0)
		}
	}

	useEffect(() => {
		if (isConnected) {
			initData()
		}
		return () => {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const subscribe = async () => {
		console.log('Subscribing...', signer.data)
		if (!isConnected) {
			alert('Please connect your wallet first.')
			return
		}
		if (!plan) {
			throw new Error('Please select a plan')
		}
		try {
			//1. Check if user has enough WCMP balance
			const wcmpBalance = await wcmp.getBalance(address?.toString() ?? '')
			console.log({ wcmpBalance })
			if (wcmpBalance.lt(plan.amount)) {
				console.log('Insufficient WCMP balance')
				//1.1. If not, Check if user has enough CMP balance
				const balance = await signer.data?.getBalance()
				console.log({ balance })
				//1.2. If not, alert user to top up
				if (balance && balance.lt(plan.amount)) {
					throw new Error('Insufficient balance')
				}
				//1.3. If yes, convert CMP to WCMP
				const tx = await wcmp.deposit(plan.amount)
				const receipt = await tx.wait()
				//1.4.  approve Payment contract to spend WCMP
				const tx2 = await wcmp.approve(MAIN_WCMP_PAYMENT_ADDRESS, plan.amount.mul(subscriptionCount))
				const receipt2 = await tx2.wait()
			} else {
				console.log('Sufficient WCMP balance')
				const tx = await wcmp.approve(MAIN_WCMP_PAYMENT_ADDRESS, plan.amount.mul(subscriptionCount))
				const receipt = await tx.wait()
			}
			//3. Subscribe to plan
			console.log('Subscribing to plan')
			const tx3 = await payment.subscribe(plan.id)
			const receipt3 = await tx3.wait()
			console.log({ receipt3 })
		} catch (error: any | ExceptionError) {
			console.log(error)
			alert(error.message)
		}
	}

	const unsubscribe = async () => {
		console.log('Unsubscribing...')
		if (!isConnected) {
			alert('Please connect your wallet first.')
			return
		}
		if (!plan) {
			throw new Error('Please select a plan')
		}
		try {
			//TODO: should we cancel the approved WCMP? The user might have other subscriptions.
			// const tx = await wcmp.approve(MAIN_WCMP_PAYMENT_ADDRESS, '0')
			const tx2 = await payment.cancelSubscription(plan.id)
			alert('Unsubscribed successfully')
		} catch (error: any | ExceptionError) {
			console.log('Error: ', error)
			alert(error.message)
		}
	}

	const loadPlan = async (planId: number) => {
		try {
			const plan = await payment.getPlan(planId)
			const subscription = await payment.getSubscription(address?.toString() ?? '', planId)
			console.log({ plan, subscription })
			const { amount, frequency, merchant, token } = plan
			setPlan({
				id: planId,
				amount: amount as BigNumber,
				frequency: frequency as BigNumber,
				merchant: merchant as string,
				token: token as string,
				subscription: subscription,
			})
		} catch (error) {
			console.log(error)
			alert('Failed to load plan. Please try again later.')
		}
	}

	const handleLoadPlan = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value)
		const planId = parseInt(e.target.value)
		loadPlan(planId)
	}

	const handleSubscriptionsCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const count = parseInt(e.target.value)
		setSubscriptionCount(count)
	}

	// const getUserSubscriptions = async () => {
	// 	try {
	// 		const plans = await payment.getSubscriptions(address?.toString() ?? '')
	// 		console.log({ plans })
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }
	return (
		<>
			<div className="h-screen bg-white">
				<Header />
				<main className="grid h-[calc(100%-80px)] place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Subscribe to Plan
						</h1>

						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 place-items-left mt-12">
							{/* Plan Title */}
							<div className="sm:col-span-2">
								<label className="block text-sm font-semibold leading-6 text-gray-900 text-left">
									Select Plan
								</label>
								<div className="mt-2.5">
									<select
										name="plan-title"
										id="plan-title"
										className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onChange={handleLoadPlan}
									>
										{[...Array(totalPlans)].map((x, i) => (
											<option key={i} value={i}>
												Plan {i}
											</option>
										))}
									</select>
								</div>
								<label className="block text-sm font-semibold leading-6 text-gray-900 text-left">
									Approve amount for number of subscriptions
								</label>
								<div className="mt-2.5">
									<input
										name="plan-title"
										id="plan-title"
										type="number"
										min={1}
										defaultValue={1}
										className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onChange={handleSubscriptionsCount}
									/>
								</div>
							</div>
							<div className="text-gray-900">
								{plan && (
									<>
										<p>Merchant: {plan.merchant}</p>
										<p>Payment Token: {plan.token}</p>
										<p>Amount: {plan.amount.toString()}</p>
										<p>Duration/Frequency: {plan.frequency.toString()}</p>
									</>
								)}
								{plan?.subscription?.subscriber != ethers.constants.AddressZero && (
									<>
										<p>Subscriber: {plan?.subscription?.subscriber}</p>
										<p>
											Subscription Date:{' '}
											{new Date((plan?.subscription?.start || 0) * 1000).toISOString()}
										</p>
										<p>
											Next Payment:{' '}
											{new Date((plan?.subscription?.nextPayment || 0) * 1000).toISOString()}
										</p>
									</>
								)}
							</div>
						</div>

						<div className="mt-10 flex items-center justify-center gap-x-6">
							{plan?.subscription?.subscriber === ethers.constants.AddressZero && (
								<button className="glow-on-hover" onClick={subscribe}>
									Subscribe
								</button>
							)}
							{plan?.subscription?.subscriber != ethers.constants.AddressZero && (
								<button className="glow-on-hover" onClick={unsubscribe}>
									Unsubscribe
								</button>
							)}
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
