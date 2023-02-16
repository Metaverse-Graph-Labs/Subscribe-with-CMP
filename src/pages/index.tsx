import Header from '@/components/HeaderBlockBaby'
import Link from 'next/link'
export default function Example() {
	return (
		<div className="isolate buy-box h-screen">
			<Header />
			<main>
				<div className="relative px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-48">
						<div className="hidden sm:mb-8 sm:flex sm:justify-center">
							<Link href="/coming-soon" className="font-semibold text-indigo-600">
								<div className="glow-on-hover-white relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
									To integrate a &quot;Buy CMP&quot; button into your website check out this project
									on our{' '}
									<span className="font-semibold text-blue-700" aria-hidden="true">
										Github &rarr;
									</span>
								</div>
							</Link>
						</div>
						<div className="text-center">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Buy CMP Token with Card
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								Here are all the ways you can buy CMP with card. Each method uses a different third
								party that works with different payment networks and regions so you can pick the method
								easiest for you.
							</p>
							<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
								<Link href="/utorg" className="glow-on-hover font-semibold min-w-fit">
									Utorg
								</Link>
								<Link href="/coming-soon" className="glow-on-hover-white font-semibold min-w-fit">
									Swipelux
								</Link>
								<Link href="/coming-soon" className="glow-on-hover font-semibold min-w-fit">
									Alchemy Pay
								</Link>
								<Link href="/coming-soon" className="glow-on-hover-white font-semibold min-w-fit">
									NowPayments
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
