import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ConnectWallet from '@/components/ConnectWallet'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import caduceusLogo from '../../public/images/caduceus-logo-black.png'

const navigation = [
	{ name: 'Browse', href: '/browse' },
	{ name: 'Create', href: '/create' },
	{ name: 'How it works', href: '/how-it-works' },
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
							<Image className="h-9" src={caduceusLogo} alt="caduceus logo" width={200} height={138} />
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
						<div>
							<SignedOut>
								<Link className="glow-on-hover" href="/sign-in">
									Sign in
								</Link>
							</SignedOut>
							<SignedIn>
								<div className="flex justify-center items-center gap-5">
									<UserButton
										userProfileMode="navigation"
										userProfileUrl="/user"
										afterSignOutUrl="/"
										// afterSignOutAll="/"
										// afterSignOutOneUrl="/"
									/>
									<ConnectWallet />
								</div>
							</SignedIn>
						</div>
					</div>
				</nav>
				<Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
					<div className="fixed inset-0 z-10" />
					<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<Link href="/" className="-m-1.5 p-1.5">
								<span className="sr-only">Caduceus Foundation</span>
								<Image className="h-9" src={caduceusLogo} alt="caduceus logo" width={200} />
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
											onClick={() => setMobileMenuOpen(false)}
											className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
										>
											{item.name}
										</Link>
									))}
								</div>
								<div className="py-6">
									<div>
										<SignedOut>
											<Link
												href="/sign-in"
												className="glow-on-hover"
												onClick={() => setMobileMenuOpen(false)}
											>
												Sign in
											</Link>
										</SignedOut>
										<SignedIn>
											<UserButton
												userProfileMode="navigation"
												userProfileUrl="/user"
												afterSignOutUrl="/"
												// afterSignOutAll="/"
												// afterSignOutOneUrl="/"
											/>
											<ConnectWallet />
										</SignedIn>
									</div>
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</div>
		</div>
	)
}
