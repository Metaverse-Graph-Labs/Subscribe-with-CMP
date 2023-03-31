import Header from '@/components/Header'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import * as payment from '@/lib/wcmpPayment'
import { MAIN_WCMP_ADDRESS } from '@/lib/consts'
import { ethers, Signer } from 'ethers'

export default function CreatePlan() {
	const { data } = useSigner()
	const { isConnected, address } = useAccount()
	const [price, setPrice] = useState<number>(2)
	const [duration, setDuration] = useState<number>(30 * 24 * 3600)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initData = async () => {
		payment.setSigner(data as Signer)
	}

	useEffect(() => {
		if (isConnected) {
			initData()
		}
		return () => {}
	}, [initData, isConnected])

	const createPlan = async () => {
		if (!isConnected) {
			alert('Please connect your wallet first.')
			return
		}
		try {
			const durationInSec = duration * 24 * 3600
			const priceInWei = ethers.utils.parseEther(price.toString())
			const tx = await payment.createPlan(MAIN_WCMP_ADDRESS, priceInWei, durationInSec)
			const receipt = await tx.wait()
			console.log(receipt)
		} catch (error) {
			console.log(error)
			alert('Failed to create plan. Please try again later.')
		}
	}
	return (
		<>
			<div className="h-screen bg-white">
				<Header />
				<main className="grid h-[calc(100%-80px)] place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Create Plan</h1>

						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 place-items-left mt-12">
							{/* Company */}
							<div className="sm:col-span-2">
								<label className="block text-sm font-semibold leading-6 text-gray-900 text-left">
									Company
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="company"
										id="company"
										className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							{/* Plan Title */}
							<div className="sm:col-span-2">
								<label className="block text-sm font-semibold leading-6 text-gray-900 text-left">
									Plan Title
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="plan-title"
										id="plan-title"
										className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							{/* Price */}
							<div className="sm:col-span-2">
								<label className="block text-sm font-semibold leading-6 text-gray-900 text-left">
									Price
								</label>
								<div className="mt-2.5">
									<input
										type="number"
										name="price"
										id="price"
										className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onKeyUp={e => {
											setPrice(parseFloat((e.target as HTMLInputElement).value))
										}}
									/>
								</div>
							</div>
							{/* Subscription Period (In Days) */}
							<div className="sm:col-span-2">
								<label className="block text-sm font-semibold leading-6 text-gray-900 text-left">
									Subscription Period (In Days)
								</label>
								<div className="mt-2.5">
									<input
										type="number"
										name="subscription-period"
										id="subscription-period"
										className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onKeyUp={e => {
											setDuration(parseFloat((e.target as HTMLInputElement).value))
										}}
									/>
								</div>
							</div>
						</div>

						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="" className="glow-on-hover" onClick={createPlan}>
								Create Plan
							</Link>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
