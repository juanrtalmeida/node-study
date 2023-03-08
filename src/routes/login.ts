import { Express } from 'express'

export function loginRoutes(app: Express) {
	app.post('/api/login', (req, res) => {
		res.status(200).json({ message: 'Login' })
	})
}
