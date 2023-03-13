import express, { Request } from 'express'
import { repo } from '@src/repo/repo'
import { genSaltSync, hashSync } from 'bcrypt'

const saltRounds = 10

const router = express.Router()

router.get('/register', (req: Request<{ key: string }, { resa: string }, { number: number }, { id: string }>, res) => {
	res.send()
})

router.post('/createSuggestion', async (req, res) => {
	const { email, name, password } = req.body
	const userSalt = genSaltSync(saltRounds)
	const user = await repo().user.create({
		data: { email, name, password: hashSync(password, userSalt), salt: userSalt }
	})
	if (user) {
		await repo().placeSuggestion.create({
			data: { address: 'av Tavares Bastos', authorId: user.id, averagePrice: 100, name: 'Casa' }
		})
	}

	res.status(200).json({ message: 'Random' })
})

export default router
