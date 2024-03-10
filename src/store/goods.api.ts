import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import md5 from 'md5'
import {
	GetItemsParams,
	IFilterForIds, // IFilterResponse,
	IIds,
	IItems,
	IServerResponse
} from 'src/models/goodsModel'

const getAuthString = () => {
	const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
	return md5(`Valantis_${timestamp}`)
}

export const goodsApi = createApi({
	reducerPath: 'goodsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://api.valantis.store:40000/',
		prepareHeaders: headers => {
			headers.set('X-Auth', getAuthString())
			headers.set('Content-Type', 'application/json')
			return headers
		}
	}),
	endpoints: build => ({
		getIds: build.query<IServerResponse<IIds>, IFilterForIds>({
			query: params => ({
				url: `/`,
				method: 'POST',
				body: { action: 'get_ids', params }
			})
		}),
		getItems: build.query<IServerResponse<IItems[]>, GetItemsParams>({
			query: params => ({
				url: `/`,
				method: 'POST',
				body: {
					action: 'get_items',
					params
				}
			})
		})
		// getFields: build.query<IFilterResponse, void>({
		// 	query: () => ({
		// 		url: `/`,
		// 		method: 'POST',
		// 		body: { action: 'get_fields', params: { field: 'brand' } }
		// 	}),
		// 	transformResponse: (response: IFilterResponse) => {
		// 		if (response.result) {
		// 			const filteredResult = response.result.filter(
		// 				(item: string | null) => item !== null
		// 			)
		// 			return { ...response, result: Array.from(new Set(filteredResult)) }
		// 		} else {
		// 			return response
		// 		}
		// 	}
		// }),
		// getFilteredItems: build.query<IServerResponse<IIds>, string>({
		// 	query: field => ({
		// 		url: '/',
		// 		method: 'POST',
		// 		body: { action: 'filter', params: { brand: field } }
		// 	})
		// })
	})
})

export const {
	useGetIdsQuery,
	useGetItemsQuery
	// useGetFieldsQuery,
	// useLazyGetFilteredItemsQuery
} = goodsApi
