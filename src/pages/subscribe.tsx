import ConnectWallet from '@/components/ConnectWallet'
import Header from '@/components/Header'
import { get_balance } from '@/lib/cmp'
import * as wcmp from '@/lib/wcmp'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import * as payment from '@/lib/wcmpPayment'
import { MAIN_WCMP_ADDRESS } from '@/lib/consts'
import { Signer } from 'ethers'
import { verify } from 'crypto'

export default function ComingSoon() {
	const provider = useProvider()
	const { data } = useSigner()
	const [wcmpBalance, setWcmpBalance] = useState('0')
	const [cmpBalance, setCmpBalance] = useState('0')
	const [signature, setSignature] = useState<string>('')
	const [signer, setSigner] = useState<string>('')

	const { isConnected, address } = useAccount()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initData = async () => {
		payment.setSigner(data as Signer)
		const wcmpBalance = await wcmp.getBalance(address?.toString() ?? '')
		const cmpBalance = await get_balance(address?.toString() ?? '')
		setWcmpBalance(wcmpBalance)
		setCmpBalance(cmpBalance)
	}

	useEffect(() => {
		if (isConnected) {
			initData()
		}
		return () => {}
	}, [initData, isConnected])

	const createPlan = async () => {
		const tx = await payment.createPlan(MAIN_WCMP_ADDRESS, 10000000000, 3600)
		const receipt = await tx.wait()
		console.log(receipt)
	}

	const subscribe = async () => {
		const tx = await payment.subscribe(0)
		const receipt = await tx.wait()
		console.log(receipt)
	}

	const signMessage = async () => {
		const message = 'Hello World'
		const signature = await payment.signMessage(message)
		setSignature(signature)
		console.log(signature)
	}

	const verifyMessage = async () => {
		const message = 'Hello World'
		const signer = await payment.verifyMessage(message, signature)
		setSigner(signer)
		console.log(signer)
	}

	return (
		<>
			<div className="h-screen bg-white">
				<Header />
				<main className="grid h-[calc(100%-80px)] place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
					{!isConnected && (
						<div className="text-center">
							<ConnectWallet />
						</div>
					)}

					{isConnected && (
						<div className="text-center">
							<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
								Subscribe with WCMP
							</h2>
							<p className="mt-6 text-base leading-7 text-gray-600">
								Your WCMP balance: {cmpBalance} CMP
							</p>
							<p className="mt-6 text-base leading-7 text-gray-600">
								Your WCMP balance: {wcmpBalance} WCMP
							</p>

							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Link className="glow-on-hover" href={'#'} onClick={createPlan}>
									Create Plan
								</Link>
							</div>

							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Link className="glow-on-hover" href={'#'} onClick={subscribe}>
									Subscribe
								</Link>
							</div>

							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Link className="glow-on-hover" href={'#'}>
									Pay
								</Link>
							</div>

							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Link className="glow-on-hover" href={'#'} onClick={signMessage}>
									Sign Message
								</Link>
							</div>
							<div className="text-gray-600">{signature.length > 0 && <p>Signature: {signature}</p>}</div>

							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Link className="glow-on-hover" href={'#'} onClick={verifyMessage}>
									Get Message Signer
								</Link>
							</div>
							<div className="text-gray-600">{signer.length > 0 && <p>Signer: {signer}</p>}</div>

							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Link href="/" className="glow-on-hover">
									Go back home
								</Link>
							</div>
						</div>
					)}
				</main>
			</div>
		</>
	)
}
