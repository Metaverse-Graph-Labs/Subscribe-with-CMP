export const APP_NAME = 'Buy CMP'
import { Chain } from 'wagmi'

export const chains: Chain[] = [
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

	// {
	// 	id: 1337,
	// 	name: 'Ganache Local Testnet',
	// 	network: 'Ganache',
	// 	rpcUrls: {
	// 		default: { http: ['http://127.0.0.1:7545'] },
	// 		public: { http: ['http://127.0.0.1:7545'] },
	// 	},
	// 	blockExplorers: { default: { url: 'https://galaxy.scan.caduceus.foundation/', name: 'Ganache Scan' } },
	// 	nativeCurrency: {
	// 		decimals: 18,
	// 		name: 'Caduceus Metaverse Protocol',
	// 		symbol: 'CMP-GANACHE',
	// 	},
	// },
]

// export const MAIN_WCMP_ADDRESS = '0x1fcba3cb797465f38839f48ca7c9cda9d9aac28b'
// Galaxy
export const MAIN_WCMP_ADDRESS = '0xab6b6212e5443228d586ce5aeb54b02b185208cc'
// export const MAIN_WCMP_PAYMENT_ADDRESS = '0x1F86EDDe4D6C9861cadb3c94AA3644A78612B0cf'
export const MAIN_WCMP_PAYMENT_ADDRESS = '0xEAB4e45C214477ad9032cCaa1D8AA4C9e7d088ba' // Updated Contract
