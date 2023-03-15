import express from 'express'

const router = express.Router()

router.get('/random', (req, res) => {
	res.status(200).json({ message: 'Random' })
})



export default router
