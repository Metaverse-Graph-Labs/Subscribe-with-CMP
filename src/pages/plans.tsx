import { Plan } from '@/lib/types/CMPPayment'
import * as payment from '@/lib/wcmpPayment'
import { BigNumber, ethers, Signer } from 'ethers'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

export default function CreatePlan() {
	const { data } = useSigner()
	const { isConnected, address } = useAccount()
	const [totalPlans, setTotalPlans] = useState<number>(0)
	const [plan, setPlan] = useState<Plan>()
	const [editing, setEditing] = useState<boolean>(false)
	const [newMerchant, setNewMerchant] = useState<string>('')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initData = async () => {
		payment.setSigner(data as Signer)
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

	const loadPlan = async (planId: number) => {
		try {
			console.log('Loading plan...', planId)
			const plan = await payment.getPlan(planId)
			const { amount, frequency, merchant, token } = plan
			setPlan({
				id: planId,
				amount: amount as BigNumber,
				frequency: frequency as BigNumber,
				merchant: merchant as string,
				token: token as string,
			})
		} catch (error) {
			console.log(error)
			alert('Failed to load plan. Please try again later.')
		}
	}

	const handleLoadPlan = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const planId = parseInt(e.target.value)
		await loadPlan(planId)
	}

	const toggleEdit = () => {
		setEditing(!editing)
	}

	const updateMerchant = async () => {
		try {
			if (!plan) {
				alert('No plan selected.')
				return
			}
			if (!ethers.utils.isAddress(newMerchant)) {
				alert('Please enter a new merchant.')
				return
			}
			const tx = await payment.updatePlan(plan.id, newMerchant)
			await tx.wait()
			alert('Merchant updated successfully.')
			setEditing(false)
			setNewMerchant('')
			await loadPlan(plan.id)
		} catch (error) {
			console.log(error)
			alert('Failed to update merchant. Please try again later.')
		}
	}

	return (
		<>
			<main className="grid h-[calc(100%-80px)] place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Plans</h1>

					<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 place-items-left mt-12">
						{/* Plans */}
						<div className="sm:col-span-2">
							<label className="block text-sm font-semibold leading-6 text-gray-900 text-left">
								Plans
							</label>
							<div className="mt-2.5">
								<select
									name="plan-title"
									id="plan-title"
									disabled={editing}
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
							{!plan && <p>No plans found.</p>}
						</div>
						{/* Update Merchant */}
						{editing && (
							<>
								<div className="sm:col-span-2">
									<label className="block text-sm font-semibold leading-6 text-gray-900 text-left">
										New Merchant
									</label>
									<div className="mt-2.5">
										<input
											type="text"
											name="new-merchant"
											id="new-merchant"
											className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={e => {
												setNewMerchant(e.target.value)
											}}
										/>
									</div>

									<div className="mt-10 flex items-center justify-center gap-x-6">
										<Link href="" className="glow-on-hover" onClick={updateMerchant}>
											Update Merchant
										</Link>
										<Link href="" className="glow-on-hover" onClick={toggleEdit}>
											Cancel
										</Link>
									</div>
								</div>
							</>
						)}
					</div>

					{!editing && (
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="" className="glow-on-hover" onClick={toggleEdit}>
								Edit Plan
							</Link>
						</div>
					)}
				</div>
			</main>
		</>
	)
}
