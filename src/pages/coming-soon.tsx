import Header from '@/components/HeaderBlockBaby'
import Link from 'next/link'

export default function ComingSoon() {
	return (
		<>
			<div className="h-screen bg-white">
				<Header />
				<main className="grid h-[calc(100%-80px)] place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Coming Soon</h1>
						<p className="mt-6 text-base leading-7 text-gray-600">
							The Caduceus team is hard at work building this integration. Please come back again later.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="/" className="glow-on-hover">
								Go back home
							</Link>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
