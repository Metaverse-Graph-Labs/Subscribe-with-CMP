export const getUtorgUrl = (address: string, timestamp: string, signature: string) => {
	const UTORG_SID = process.env.NEXT_PUBLIC_UTORG_SID

	const url = `https://app-stage.utorg.pro/direct/${UTORG_SID}?&currency=CMP&timestamp=${timestamp}&alg=WEB3&publicKey=${address}&signature=${signature}`
	console.log('UTORG', url)
	return url
}
