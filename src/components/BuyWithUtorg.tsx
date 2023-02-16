import { getUtorgUrl } from '@/lib/utils'
import { verifyMessage } from 'ethers/lib/utils'
import * as React from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import ConnectWallet from './ConnectWallet'

export function BuyWithUtorg() {
	const { isConnected } = useAccount()
	const recoveredAddress = React.useRef<string>()
	const timestamp = React.useRef<string>()
	const message = React.useRef<string>()

	const { data, error, isLoading, signMessage } = useSignMessage({
		onSuccess(data, variables) {
			// Verify signature when sign message succeeds
			const address = verifyMessage(variables.message, data)
			recoveredAddress.current = address
		},
	})
	const executeSignMessage = async () => {
		timestamp.current = Date.now().toString()
		message.current = `Access to UTORG. Timestamp: ${timestamp.current}`
		// const formData = new FormData(event.target)
		// const message = formData.get('message')
		// @ts-ignore
		signMessage({ message: message.current })
	}

	if (!isConnected) {
		return <ConnectWallet />
	}

	return (
		<div className="flex flex-col gap-5 m-5">
			{!data || !recoveredAddress.current || !timestamp.current ? (
				<button className="glow-on-hover font-bold" disabled={isLoading} onClick={executeSignMessage}>
					{isLoading ? 'Awaiting Signature ...' : 'Sign Message'}
				</button>
			) : (
				<a
					href={getUtorgUrl(recoveredAddress.current, timestamp.current, data)}
					target="_blank"
					rel="noreferrer"
				>
					<div className="glow-on-hover font-bold flex text-center justify-center items-center">Buy CMP</div>
				</a>
			)}

			{error && <div>{error.message}</div>}
		</div>
	)
}
