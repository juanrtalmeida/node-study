import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk'
import { loginRoutes } from '@src/routes/login'
import { repo } from './Repo/repo'
import { RequestType, TypedResponse } from './types/endpoint'
import { registerRoutes } from './routes/register'

function colorizeMethod(method: string) {
	switch (method) {
		case 'GET':
			return chalk.green(method)
		case 'POST':
			return chalk.blue(method)
		case 'PUT':
			return chalk.yellow(method)
		case 'DELETE':
			return chalk.red(method)
		default:
			return chalk.white(method)
	}
}

dotenv.config()
export const app = express()

app.use(json(), cors())

async function main() {
	loginRoutes(app)
	registerRoutes(app)
	app.post(
		'/api/test',
		(
			req: RequestType<{ number_two: number; number_one: number }>,
			res: TypedResponse<{ message: string } | { sum: string }>
		) => {
			if (Object.values(req.body).length > 2) {
				res.status(400).json({ sum: 'Too many arguments' })
				return
			}
			res.status(200).json({ message: `Sum is ${req.body.number_two + req.body.number_one}` })
		}
	)

	app.get('/random', (req, res) => {
		res.status(403).json({ message: 'fasd' })
	})

	const port = process.env.PORT

	const host = 'http://localhost'

	app.listen(port, () => {
		console.log(`\nServer listening on ${host}:${port}`)
		console.log('Routes: \n')
		if (process.env.NODE_ENV === 'dev') {
			// eslint-disable-next-line no-underscore-dangle
			app._router.stack
				.filter((r: any) => r.route)
				.forEach((r: any) => console.log(colorizeMethod(r.route.stack[0].method.toUpperCase()), r.route.path))
		}
	})
}

main().finally(async () => {
	await repo().$disconnect()
})
