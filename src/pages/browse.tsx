import { CircleStackIcon } from '@heroicons/react/20/solid'

const features = [
	{
		name: 'Fantasy Sports Logic Subscription',
		description: `Welcome to Fantasy Sports Logic, the premier destination for fantasy sports enthusiasts looking to gain an edge in their games. Our company is dedicated to providing our users with the best tips, tools, and technology available, so they can make informed decisions and win big.
			 At Fantasy Sports Logic, we understand the importance of staying ahead of the competition. That's why we've developed the Contrarian Edge Optimizer, powered by our patented machine technology. Our optimizer takes into account all of the relevant factors that can impact your games, including player statistics, injuries, and game conditions, to provide you with the most accurate projections and advice available.
			 But we don't stop there.
			 We are committed to helping our users at every step of the way, from beginner to professional.
			 That's why we offer a range of resources to help you hone your skills and improve your game.
			 Whether you prefer daily podcasts, a weekly newsletter, or live streaming DFS news, we have the tools and resources you need to stay informed and stay ahead.
			 And if that's not enough, we're excited to announce that we'll soon be launching a TV show, bringing you even more insights and strategies to help you win big.
			 Whether you're new to fantasy sports or a seasoned pro, Fantasy Sports Logic is the go-to website for all your fantasy sports needs.
			 So why wait? Sign up today and start winning with Fantasy Sports Logic.
			`,
		href: '/subscribe/fantasy-sports-logic',
		icon: CircleStackIcon,
	},
]

export default function Browse() {
	return (
		<div className="w-full ">
			<div className="py-24 sm:py-32 w-full ">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Browse the Services Available
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Browser through the services that are currently accepting CMP as a recurring monthly payment
							method. Find out how you can spend your CMP. While this list is small to begin with, more
							and more businesses will want to accept CMP into their websites. Come back to see what else
							you can spend your money on.
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1">
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
											>
												{feature.name}
											</a>
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
