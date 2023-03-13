import express, { Router } from 'express'
import fs from 'fs'
import path from 'path'
import url from 'url'

export const router = express.Router()
const files = fs.readdirSync(path.dirname(url.fileURLToPath(import.meta.url))).filter((f) => f !== (process.env.NODE_ENV === 'prod' ? 'index.js' : 'index.ts'))
const promises = files.map(async (file) => {
	const { default: routingPath } = await import(`./${file}`)
	return routingPath as Router
})
async function loadRouters() {
	const routePaths = await Promise.all(promises)
	router.use(...routePaths)
}

if(process.env.NODE_ENV === 'prod'){
  loadRouters()
}else{
  await loadRouters()
}
