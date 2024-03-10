export interface IServerResponse<T> {
	result: T
}

export interface IIds {
	result: string[] | undefined
}

export interface IFilterForIds {
	offset: number
	limit: number
}

export interface IFilterResponse extends IServerResponse<string[]> {}

export interface IItems {
	brand: string | null
	id: string
	price: number
	product: string
}

export interface GetItemsParams {
	ids: IIds | undefined
}
