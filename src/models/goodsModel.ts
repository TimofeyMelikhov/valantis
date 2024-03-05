export interface IServerResponse<T> {
	result: T
}

export interface IIds {
	result: string[]
}

export interface IFilterForIds {
	offset: number
	limit: number
}

export interface IItems {
	brand: string | null
	id: string
	price: number
	product: string
}
