import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { repo } from './Repo/repo'

dotenv.config()

const app = express()

app.use(json(), cors())

async function main() {
	app.post('/api/test', (req, res) => {
		if (Object.values(req.body).length > 2) {
			res.status(400).json({ message: 'Too many arguments' })
			return
		}
		res.status(200).json({ message: `Sum is ${req.body.number_two + req.body.number_one}` })
	})

	app.get('/random', (req, res) => {
		res.status(403).json({ message: 'fasd' })
	})

	const port = process.env.PORT

	const host = 'http://localhost'

	app.listen(port, () => {
		console.log(`\nServer listening on ${host}:${port}\n`)
	})
}

main().finally(async () => {
	await repo().$disconnect()
})
