import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk'
import { repo } from '@src/repo/repo'
import helmet from 'helmet'
import { RequestType, TypedResponse } from './types/endpoint'

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
const app = express()

// important middlewares
app.use(json(), cors(), helmet())

async function main() {
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
		res.status(200).json({ message: 'Random' })
	})

	const port = Number(process.env.PORT) || 3000

	const host = 'http://localhost'

	app.listen(port, '0.0.0.0', () => {
		console.log(`\nServer listening on ${host}:${port}`)
		if (process.env.NODE_ENV === 'dev') {
			console.log('Routes: \n')
			// eslint-disable-next-line no-underscore-dangle
			app._router.stack
				.filter((r: { route: unknown }) => r.route)
				.forEach((r: { route: { stack: { method: string }[]; path: string } }) =>
					console.log(colorizeMethod(r.route.stack[0].method.toUpperCase()), r.route.path)
				)
		}
	})
}

main().finally(async () => {
	await repo().$disconnect()
})
