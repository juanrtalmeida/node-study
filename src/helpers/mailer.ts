import { createTransport } from 'nodemailer'

export function sendMail(to: string) {
	createTransport({
		auth: {
			pass: process.env.PASSWORD,
			user: process.env.EMAIL
		},
		service: 'gmail'
	}).sendMail(
		{
			from: 'The Idea project',
			subject: 'My first Email!!!',
			text: 'This is my first email. I am so excited!',
			to
		},
		(e) => {
			console.log(e)
		}
	)
}
