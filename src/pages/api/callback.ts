import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

/**
 * (Optional)
 * UTORG sends send callbacks if you wish to have more information
 * @TODO
 * @see https://docs.utorg.pro/#postback-example
 */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const headers = req.headers
	// X-SIGN header value from postback response
	const signature = headers['X-SIGN'] as string
	// Body of the payload as is
	const body = req.body
	// Public key received from UTORG team
	const publicKey = ''
	// Convert to PEM for nodejs crypto: add prefix, posfix and split by 64 symbols. It doesn't need for java, golang etc.
	const publicKeyPem = `-----BEGIN PUBLIC KEY-----
${publicKey.replace(/(.{64})/g, '$1\n')}
-----END PUBLIC KEY-----`
	const verifier = crypto.createVerify('RSA-SHA256')
	verifier.update(body)
	const isValid = verifier.verify(publicKeyPem, signature, 'base64')
	console.log('isValid? ', isValid)
	res.status(200).json({ isValid })
}

export default handler
