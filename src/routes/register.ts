import { Express } from 'express'

export function registerRoutes(app: Express) {
	app.post('/api/register', async (req, res) => {
		res.status(200).json({ message: 'Register' })
	})
}
