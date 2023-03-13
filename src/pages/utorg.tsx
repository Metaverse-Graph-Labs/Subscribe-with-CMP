import Header from '@/components/HeaderBlockBaby'
import { BuyWithUtorg } from '@/components/BuyWithUtorg'
import {
	ArrowRightOnRectangleIcon,
	CheckCircleIcon,
	CreditCardIcon,
	ExclamationCircleIcon,
	LockClosedIcon,
} from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/outline'

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
	const router = useRouter()
	const { success } = router.query

	const showSuccess = () => {
		let header
		let message
		let successIcon
		if (success === 'true') {
			header = 'Payment Sucessfull'
			message =
				'Utorg will now process your payment and you should receive it in the wallet that you have signed with in a few minutes'
			successIcon = true
		} else if (success === 'false') {
			header = 'Payment Unsuccessful'
			message = 'Utorg could not process your payment correctly. Please try again later.'
		} else {
			return <></>
		}

		return (
			<div className="p-4 w-96 m-auto">
				<div className="flex items-start m-auto">
					<div className="flex-shrink-0">
						{successIcon ? (
							<CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
						) : (
							<ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
						)}
					</div>
					<div className="ml-3 w-0 flex-1 pt-0.5">
						<p className="text-sm font-medium text-gray-900">{header}</p>
						<p className="mt-1 text-sm text-gray-500">{message}</p>
					</div>
					{/* <div className="ml-4 flex flex-shrink-0">
						<button
							type="button"
							className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							onClick={() => {
								// setShow(false);
							}}
						>
							<span className="sr-only">Close</span>
							<XMarkIcon className="h-5 w-5" aria-hidden="true" />
						</button>
					</div> */}
				</div>
			</div>
		)
	}

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
					<div className="mt-8 m-auto">{showSuccess()}</div>
				</div>
			</div>
		</div>
	)
}
