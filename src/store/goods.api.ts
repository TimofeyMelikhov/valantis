import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import md5 from 'md5'
import {
	IFilterForIds,
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
		getItems: build.query<IServerResponse<IItems[]>, IIds | undefined>({
			query: params => ({
				url: `/`,
				method: 'POST',
				body: { action: 'get_items', params }
			})
		})
	})
})

export const { useGetIdsQuery, useGetItemsQuery } = goodsApi
