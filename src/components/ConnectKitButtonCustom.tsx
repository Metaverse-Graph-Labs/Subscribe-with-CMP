import { ConnectKitButton } from 'connectkit'
export const ConnectKitButtonCustom = () => {
	return (
		<ConnectKitButton.Custom>
			{({ isConnected, show, truncatedAddress, ensName }) => {
				return (
					<div className="glow-on-hover" onClick={show}>
						{isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
					</div>
				)
			}}
		</ConnectKitButton.Custom>
	)
}
