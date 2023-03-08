import { Request, Response } from 'express'
import { Query, Send } from 'express-serve-static-core'

export interface RequestTypeWithQuery<T, U extends Query> extends Request {
	body: T
	query: U
}

export interface RequestType<T> extends Request {
	body: T
}

export interface TypedResponse<ResBody> extends Response {
	json: Send<ResBody, this>
}
