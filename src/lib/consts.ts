export const APP_NAME = 'Buy CMP'
import { Chain } from 'wagmi'

export const chains: Chain[] = [
	{
		id: 256256,
		name: 'Caduceus',
		network: 'Caduceus Mainnet',
		rpcUrls: {
			default: { http: ['https://mainnet.block.caduceus.foundation/'] },
			public: { http: ['https://mainnet.block.caduceus.foundation/'] },
		},
		blockExplorers: { default: { url: 'https://mainnet.scan.caduceus.foundation/', name: 'Caduceus Scan' } },
		nativeCurrency: {
			decimals: 18,
			name: 'Caduceus Metaverse Protocol',
			symbol: 'CMP',
		},
	},
	{
		id: 512512,
		name: 'Caduceus Galaxy Testnet',
		network: 'Galaxy Testnet',
		rpcUrls: {
			default: { http: ['https://galaxy.block.caduceus.foundation/'] },
			public: { http: ['https://mainnet.block.caduceus.foundation/'] },
		},
		blockExplorers: { default: { url: 'https://galaxy.scan.caduceus.foundation/', name: 'Caduceus Galaxy Scan' } },
		nativeCurrency: {
			decimals: 18,
			name: 'Caduceus Metaverse Protocol',
			symbol: 'CMP',
		},
	},
]
