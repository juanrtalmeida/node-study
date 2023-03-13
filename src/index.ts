import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { repo } from './repo/repo.js'
import helmet from 'helmet'
import { router } from './routes/index.js'
import { routeShowing } from './helpers/routeShowing.js'
import { errorHandler } from './helpers/errorHandlers.js'

dotenv.config()
const app = express()
// important middlewares
app.use(json(), cors(), helmet())
app.use('/api', router)
app.all('*', (req, res) => {
	res.status(404).json({ message: 'No such route' })
})
app.use(errorHandler)

async function main() {
	const port = Number(process.env.PORT) || 3000

	const host = 'http://localhost'

	app.listen(port, '0.0.0.0', () => {
		if(process.env.NODE_ENV ==='dev'){

      console.clear()
      console.log(`\nServer listening on ${host}:${port}`)
      console.log('Routes: \n')
      routeShowing(router)
    }
	})
}

main().finally(async () => {
	await repo().$disconnect()
})
