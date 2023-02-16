import Header from '@/components/HeaderBlockBaby'
import { BuyWithUtorg } from '@/components/BuyWithUtorg'
import { ArrowRightOnRectangleIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/20/solid'

const features = [
	{
		name: 'Connect Wallet',
		description:
			'Sign in to your wallet via using Metamask, Wallet Connect, or any other method to log onto the browser ',
		href: '#',
		icon: ArrowRightOnRectangleIcon,
	},
	{
		name: 'Sign a Message',
		description:
			'Sign a message with your wallet that tells our third party provider Utorg that it is really you buying the assets',
		href: '#',
		icon: LockClosedIcon,
	},
	{
		name: 'Buy with Card',
		description:
			'Go through the Utorg KYC flow (you only have to do this once) and then enter your card details to have CMP sent to your wallet',
		href: '#',
		icon: CreditCardIcon,
	},
]

export default function Utorg() {
	return (
		<div className="buy-box w-full min-h-screen">
			<Header />
			<div className="py-24 sm:py-32 w-full min-h-screen">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Purchase CMP with Utorg.
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Follow these 3 simple steps to purchase the Caduceus Metaverse Protocol Token (CMP) and have
							it sent to a wallet of your choice.
						</p>
						<div className="m-10">
							<BuyWithUtorg />
						</div>
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
