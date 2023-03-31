import Link from 'next/link'

export default function Home() {
	return (
		<div className="isolate">
			<main>
				<div className="relative px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-48">
						<div className="hidden sm:mb-8 sm:flex sm:justify-center">
							<Link
								href="https://github.com/Metaverse-Graph-Labs/Buy-CMP"
								className="font-semibold text-indigo-600"
								target="_blank"
							>
								<div className="glow-on-hover-white relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
									To create a subscription &quot; with CMP&quot; then sign up to our{' '}
									<span className="font-semibold text-blue-700" aria-hidden="true">
										Dashboard &rarr;
									</span>
								</div>
							</Link>
						</div>
						<div className="text-center">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Subscribe to Services with CMP
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								We make Crypto Subscriptions with CMP easy. Browse shops where you can spend your CMP.
								Or if you are a developer then start accepting recurring CMP subscriptions straight away
							</p>
							<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 items-center justify-center">
								<Link href="/browse" className="glow-on-hover font-semibold min-w-fit">
									Browse Services that accept CMP
								</Link>
								<Link href="/create" className="glow-on-hover-white font-semibold min-w-fit">
									Incorporate monthly CMP subscriptions into your product
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
