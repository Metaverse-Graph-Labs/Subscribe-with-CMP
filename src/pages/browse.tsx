import { supabaseClient } from '@/lib/supapase-client'
import { useAuth, useSession } from '@clerk/nextjs'
import { BuildingOfficeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Database } from 'types/supabase'

export default function Browse() {
	const { session, isLoaded } = useSession()
	const { userId } = useAuth()
	const [loading, setLoading] = useState(true)
	const [merchants, setMerchants] = useState<Database['public']['Tables']['merchants']['Row'][]>()
	const [subscriptions, setSubscriptions] = useState<Database['public']['Tables']['subscriptions']['Row'][]>()

	const subscribe = async (subscriptionId: number) => {
		if (!session || !userId) {
			return
		}

		const supabaseAccessToken = await session.getToken({
			template: 'supabase',
		})

		const supabase = await supabaseClient(supabaseAccessToken!)
		const { data, error } = await supabase
			.from('user_subscriptions')
			.insert({ subscription_id: subscriptionId, user_id: userId })
			.select()

		if (error) {
			alert(error)
		} else {
			alert('You subscribed successfully')
		}
	}
	// on first load, fetch and set todos
	useEffect(() => {
		const loadSubscriptions = async () => {
			try {
				setLoading(true)
				const supabaseAccessToken = await session!.getToken({
					template: 'supabase',
				})

				const supabase = await supabaseClient(supabaseAccessToken!)
				const { data: subscriptions } = await supabase.from('subscriptions').select('*')
				if (subscriptions) {
					setSubscriptions(subscriptions)
				}
			} catch (e) {
				alert(e)
			} finally {
				setLoading(false)
			}
		}

		const loadMerchants = async () => {
			try {
				setLoading(true)
				const supabaseAccessToken = await session!.getToken({
					template: 'supabase',
				})

				const supabase = await supabaseClient(supabaseAccessToken!)
				const { data: merchants } = await supabase.from('merchants').select('*')
				if (merchants) {
					setMerchants(merchants)
				}
			} catch (e) {
				alert(e)
			} finally {
				setLoading(false)
			}
		}

		if (isLoaded) {
			loadMerchants()
			loadSubscriptions()
		}
	}, [isLoaded])

	return (
		<div className="w-full ">
			<div className="py-24 sm:py-32 w-full ">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Browse the Services Available
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Browser through the services that are currently accepting CMP as a recurring monthly payment
							method. Find out how you can spend your CMP. While this list is small to begin with, more
							and more businesses will want to accept CMP into their websites. Come back to see what else
							you can spend your money on.
						</p>
						<div className="mt-5">
							<Link href={'/create'} className="glow-on-hover pt-5">
								Create Your Own Subscription
							</Link>
						</div>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1">
							{merchants &&
								merchants
									.sort((a, b) => a.id - b.id)
									.map(merchant => (
										<div key={merchant.company} className="flex flex-col">
											<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
												<BuildingOfficeIcon
													className="h-5 w-5 flex-none text-black"
													aria-hidden="true"
												/>
												{merchant.company}
											</dt>
											<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
												<p className="flex-auto">{merchant.description}</p>
												<div className="flex gap-10 mt-6">
													<div className="flex gap-3 mt-2 items-center">
														<p className="">Link: </p>
														<a
															href={merchant.link!}
															className="text-base font-semibold leading-7 text-indigo-600"
														>
															{merchant.link}
														</a>
														<p className="ml-5">Contact: </p>
														<a
															href={`mailto:${merchant.contact}`}
															className="text-base font-semibold leading-7 text-indigo-600"
														>
															{merchant.contact}
														</a>
													</div>
												</div>
											</dd>
											<div className="flex flex-col pl-10 gap-x-3 mt-10 gap-14">
												{!subscriptions?.filter(
													subscription => subscription.user_id === merchant.user_id
												).length && (
													<p>More subscriptions coming soon for {merchant.company}</p>
												)}
												{subscriptions
													?.filter(subscription => subscription.user_id === merchant.user_id)
													.map(subscription => (
														<div>
															<div className="flex align-middle  items-center gap-5 font-semibold leading-7 text-gray-900">
																<CurrencyDollarIcon
																	className="h-5 w-5 flex-none text-black"
																	aria-hidden="true"
																/>
																<h3>{subscription.title}</h3>
															</div>
															<div className="flex gap-3 mt-2 items-center">
																<p className="">Price: </p>
																<p className="text-base font-semibold leading-7 text-indigo-600">
																	${subscription.price}
																</p>
																<p className="ml-10">Billed every: </p>
																<p className="text-base font-semibold leading-7 text-indigo-600">
																	{subscription.duration} days
																</p>
																<p className="ml-10">
																	Recommended subscription length:{' '}
																</p>
																<p className="text-base font-semibold leading-7 text-indigo-600">
																	12 months
																</p>
															</div>
															<p className="mt-5">{subscription.description}</p>
															{/* TODO: ADD functionality */}
															<button
																className="mt-5 glow-on-hover"
																onClick={() => subscribe(subscription.id)}
															>
																Subscribe
															</button>
														</div>
													))}
											</div>
										</div>
									))}
						</dl>
					</div>
				</div>
			</div>
		</div>
	)
}
