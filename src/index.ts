import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(json(), cors())

app.post('/api/test', (req, res) => {
	console.log(req.body)
	res.status(200).json({ message: 'HAPPY CODING' })
})

const port = process.env.PORT

const host = 'http://localhost'

app.listen(port, () => {
	console.log(`\nServer listening on ${host}:${port}\n`)
})
