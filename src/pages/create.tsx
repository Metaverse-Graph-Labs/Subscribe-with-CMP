import { BellAlertIcon, PlusCircleIcon, UserPlusIcon } from '@heroicons/react/20/solid'

const features = [
	{
		name: 'Create a Subscription',
		description: 'Give your subscription a name, an ID, a montly price and your address to receive the payments.',
		href: '#',
		icon: PlusCircleIcon,
	},
	{
		name: 'Sign up for Webhook Notifications',
		description:
			'Sign up on our dashboard and you can receive notifications to your backend for every subscription create, update and delete event.',
		href: '#',
		icon: BellAlertIcon,
	},
	{
		name: 'Update your Backend',
		description: 'Update your backend to receive these webhooks and update the membership status of your users',
		href: '#',
		icon: UserPlusIcon,
	},
]

export default function Utorg() {
	return (
		<div className="w-full ">
			<div className="py-24 sm:py-32 w-full ">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Create a Subscription
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Follow these 3 simple steps to create your own subscription and start accepting recurring
							CMP payments straight away
						</p>
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
					</div>
				</div>
			</div>
		</div>
	)
}
