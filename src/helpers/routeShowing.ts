import { Router } from 'express'

import chalk from 'chalk'

function colorizeMethod(method: string) {
	switch (method) {
		case 'GET':
			return chalk.bgGreen(` ${method} `)
		case 'POST':
			return chalk.bgBlue(` ${method} `)
		case 'PUT':
			return chalk.bgYellow(` ${method} `)
		case 'DELETE':
			return chalk.bgRed(` ${method} `)
		default:
			return chalk.bgGray(` ${method} `)
	}
}

export function routeShowing(router: Router) {
	router.stack
		.map(
			(r: {
				handle: { stack: Array<{ route: { path: string; stack: Array<{ method: string }> } }> }
				route: { path: string; methods: { _all: boolean } }
			}) => {
				if (!r.handle.stack) {
					return [{ path: r.route.path, method: r.route.methods._all ? 'all' : 'none' }]
				}
				return r.handle.stack
					.filter((s) => s.route)
					.map((s) => {
						return { path: s.route.path, method: s.route.stack[0].method }
					})
			}
		)
		.flat()
		.forEach((r) => console.log(`\t${colorizeMethod(r.method.toUpperCase())} ${r.path}`))
}
