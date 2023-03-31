import { supabaseClient } from '@/lib/supapase-client'
import { useAuth, useSession } from '@clerk/nextjs'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

interface UserSubscription {
	id: number
	subscriptions: {
		id: number
		created_at: string
		title: string | null
		price: number | null
		duration: number | null
		description: string | null
	} | null
}

type UserSubscriptions = UserSubscription[] | null | undefined
export default function Dashboard() {
	const { session, isLoaded } = useSession()
	const { userId } = useAuth()
	const [loading, setLoading] = useState(true)
	const [refetch, setRefetch] = useState(0)
	const [userSubscriptions, setUserSubscriptions] = useState<UserSubscriptions>()

	const unsubscribe = async (subscriptionId: number) => {
		setLoading(true)
		if (!session) {
			return
		}
		const supabaseAccessToken = await session.getToken({
			template: 'supabase',
		})

		const supabase = await supabaseClient(supabaseAccessToken!)
		const { data, error } = await supabase.from('user_subscriptions').delete().eq('id', subscriptionId)

		if (error) {
			alert(error)
		}
		setLoading(false)
		setRefetch(refetch + 1)
	}
	// on first load, fetch and set todos
	useEffect(() => {
		const loadUserSubscriptions = async () => {
			try {
				setLoading(true)
				const supabaseAccessToken = await session!.getToken({
					template: 'supabase',
				})

				const supabase = await supabaseClient(supabaseAccessToken!)
				const { data, error } = await supabase
					.from('user_subscriptions')
					.select(
						`
							id,
							subscriptions (
								id,
								title,
								price,
								duration,
								description,
								created_at
							)
						`
					)
					.eq('user_id', userId)
				if (data) {
					// @ts-ignore
					setUserSubscriptions(data)
				}
			} catch (e) {
				alert(e)
			} finally {
				setLoading(false)
			}
		}

		if (isLoaded) {
			loadUserSubscriptions()
		}
	}, [isLoaded, refetch])

	return (
		<div className="py-10 w-full ">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10">
				<div className="mx-auto max-w-2xl lg:text-center">
					<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dashboard</p>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						View your subscriptions and upcoming payments
					</p>
				</div>
				{userSubscriptions &&
					userSubscriptions.map(userSubscription => (
						<div className="mt-4">
							<div className="flex align-middle  items-center gap-5 font-semibold leading-7 text-gray-900">
								<CurrencyDollarIcon className="h-5 w-5 flex-none text-black" aria-hidden="true" />
								<h3>{userSubscription.subscriptions?.title}</h3>
							</div>
							<div className="flex gap-3 mt-2 items-center">
								<p className="">Price: </p>
								<p className="text-base font-semibold leading-7 text-indigo-600">
									${userSubscription.subscriptions?.price}
								</p>
								<p className="ml-10">Billed every: </p>
								<p className="text-base font-semibold leading-7 text-indigo-600">
									{userSubscription.subscriptions?.duration} days
								</p>
								<p className="ml-10">Subscribed for: </p>
								<p className="text-base font-semibold leading-7 text-indigo-600">12 months</p>
								<p className="ml-10">Date started</p>
								<p className="text-base font-semibold leading-7 text-indigo-600">
									{userSubscription.subscriptions?.created_at}
								</p>
								<p className="ml-10">Expiry Date</p>
								<p className="text-base font-semibold leading-7 text-indigo-600">12/12/23</p>
							</div>
							<p className="mt-5">{userSubscription.subscriptions?.description}</p>
							{/* TODO: ADD functionality */}
							<button className="mt-5 glow-on-hover" onClick={() => unsubscribe(userSubscription.id)}>
								Unsubscribe
							</button>
						</div>
					))}
			</div>
		</div>
	)
}
