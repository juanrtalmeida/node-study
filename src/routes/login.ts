import express, { Request } from 'express'

const router = express.Router()

router.get('/random', async(req: Request<{}>, res) => {
	throw new Error('random error')
})



export default router
