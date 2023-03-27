import 'tailwindcss/tailwind.css'
import '../css/styles.css'
import { ThemeProvider } from 'next-themes'
import Web3Provider from '@/components/Web3Provider'
import { AppProps } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs'
import Layout from '@/components/Layout'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider attribute="class">
			<Web3Provider>
				<ClerkProvider {...pageProps}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ClerkProvider>
			</Web3Provider>
		</ThemeProvider>
	)
}

export default App
