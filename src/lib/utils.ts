export const getUtorgUrl = (address: string, timestamp: string, signature: string) => {
	const UTORG_SID = process.env.NEXT_PUBLIC_UTORG_SID
	const urlBase = process.env.NODE_ENV === 'production' ? 'app' : 'app-stage'
	const url = `https://${urlBase}.utorg.pro/direct/${UTORG_SID}/${address}?&currency=CMP&timestamp=${timestamp}&alg=WEB3&publicKey=${address}&signature=${signature}`
	console.log('UTORG', url)
	return url
}
