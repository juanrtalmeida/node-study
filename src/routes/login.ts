import { repo } from '@src/repo/repo'
import { Express } from 'express'

export function loginRoutes(app: Express) {
	app.post('/api/login', async (req, res) => {
		try {
			const user = await repo().user.create({ data: { email: req.body.email, password: 'fasdf' } })
			console.log('user')
			console.log(user)
		} catch (e) {
			console.log(e)
		}

		res.status(200).json({ message: 'Login' })
	})
}
