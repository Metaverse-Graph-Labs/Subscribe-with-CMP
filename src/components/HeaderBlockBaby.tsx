import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ConnectWallet from '@/components/ConnectWallet'
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
	{ name: 'Buy with Utorg', href: '/utorg' },
	{ name: 'Buy with Swipelux', href: '/coming-soon' },
	{ name: 'Buy with Alchemy Pay', href: '/coming-soon' },
	{ name: 'Buy with NowPayments', href: '/coming-soon' },
]

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<div className="isolate h-20">
			<div className="px-6 pt-6 lg:px-8">
				<nav className="flex items-center justify-between" aria-label="Global">
					<div className="flex lg:flex-1">
						<Link href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">Caduceus Foundation</span>
							<img
								className="h-8"
								src="/images/caduceus-logo-black.png"
								alt="caduceus logo"
								// width={200}
								// height={38}
							/>
						</Link>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map(item => (
							<Link
								key={item.name}
								href={item.href}
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								{item.name}
							</Link>
						))}
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<ConnectWallet />
					</div>
				</nav>
				<Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
					<Dialog.Panel
						// focus="true"
						className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
					>
						<div className="flex items-center justify-between">
							<Link href="/" className="-m-1.5 p-1.5">
								<span className="sr-only">Caduceus Foundation</span>
								<img className="h-8" src="/images/caduceus-logo-black.png" alt="caduceus logo" />
							</Link>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navigation.map(item => (
										<Link
											key={item.name}
											href={item.href}
											className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
										>
											{item.name}
										</Link>
									))}
								</div>
								<div className="py-6">
									<ConnectWallet />
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</div>
		</div>
	)
}
