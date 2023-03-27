import styles from '/styles/Shared.module.css'
import Header from './Header'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => (
	<div className="bg-gradient">
		<Header />
		<main className={styles.container}>{children}</main>
	</div>
)

export default Layout
