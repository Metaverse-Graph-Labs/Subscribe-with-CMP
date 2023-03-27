import Header from '@/components/Header'
import {
	ArrowRightOnRectangleIcon,
	CreditCardIcon,
	CurrencyDollarIcon,
	FingerPrintIcon,
	LockClosedIcon,
} from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'

const features = [
	{
		name: 'Title',
		description: 'Fantasy Sports Logic Montly Subscription',
		href: '#',
		icon: FingerPrintIcon,
	},
	{
		name: 'Amount',
		description: '$30',
		href: '#',
		icon: CurrencyDollarIcon,
	},
]

export default function Utorg() {
	const router = useRouter()
	const { subscriptionId } = router.query

	return (
		<div className="buy-box w-full ">
			<Header />
			<div className="py-24 sm:py-32 w-full ">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							{subscriptionId}
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">Subscription description</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
							{features.map(feature => (
								<div key={feature.name} className="flex flex-col">
									<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
										<feature.icon className="h-5 w-5 flex-none text-black" aria-hidden="true" />
										{feature.name}
									</dt>
									<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
										<p className="flex-auto">{feature.description}</p>
										<p className="mt-6">
											<a
												href={feature.href}
												className="text-base font-semibold leading-7 text-indigo-600"
											></a>
										</p>
									</dd>
								</div>
							))}
						</dl>
						{/* <Subscribe id={subscriptionId} /> */}
					</div>
				</div>
			</div>
		</div>
	)
}
