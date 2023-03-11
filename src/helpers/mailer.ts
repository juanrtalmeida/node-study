import { createTransport } from 'nodemailer'

export function sendMail(to: string) {
	createTransport({
		service: 'gmail',
		auth: {
			pass: process.env.PASSWORD,
			user: process.env.EMAIL
		}
	}).sendMail(
		{
			from: 'The Idea project',
			to,
			subject: 'My first Email!!!',
			text: 'This is my first email. I am so excited!'
		},
		(e) => {
			console.log(e)
		}
	)
}
