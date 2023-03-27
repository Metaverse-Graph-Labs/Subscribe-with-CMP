import { ClipboardDocumentCheckIcon, CreditCardIcon, GiftIcon, ShieldCheckIcon } from '@heroicons/react/20/solid'

const features = [
	{
		name: 'First you need to own some CMP',
		description:
			'You can buy CMP on multiple exhanges (ByBit, Kraken, etc...) or you can buy it with card on https://buy.cmpcoin.io.',
		href: '#',
		icon: CreditCardIcon,
	},
	{
		name: 'Second you need to wrap CMP',
		description:
			"Wrapping CMP allows us the capabilities to create recurring subscriptions. Don't worry, wrapping CMP is completely safe and reversible and you can unwrap your CMP at any time. You can wrap cmp at https://wrap.cmpcoin.io",
		href: '#',
		icon: GiftIcon,
	},
	{
		name: 'Third you need to approve subscriptions',
		description:
			'For each service that you wish to subscribe to, you will have to approve the amount of months that you want to be subscribed for. This sets up a direct debit every month for the subscription.',
		href: '#',
		icon: ClipboardDocumentCheckIcon,
	},
	{
		name: 'Lastly, you can sleep easy as your funds are safe',
		description:
			'Your funds are still completely in your wallet, the only thing the smart contract can do is take the subscription amount once a month. You can cancel any time, and your funds are not locked.',
		href: '#',
		icon: ShieldCheckIcon,
	},
]

export default function HowItWorks() {
	return (
		<div className="w-full">
			<div className="py-24 sm:py-32 w-full">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							How to subscribe for services with CMP
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Subscribing with CMP is super easy, you can sleep easy knowing that your funds are in your
							control and you can cancel anytime. Here is how it works:
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
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
