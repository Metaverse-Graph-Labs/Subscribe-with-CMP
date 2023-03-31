import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json({ name: 'hello, world!' })
}

console.log('hello, worldddddddd!')

export default handler
