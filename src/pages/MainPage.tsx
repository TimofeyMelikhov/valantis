import { Paper } from '@mui/material'
import { Pagination } from '@mui/material'
import { memo, useCallback, useEffect, useState } from 'react'
import { IItems } from 'src/models/goodsModel'
import {
	useGetFieldsQuery,
	useGetIdsQuery,
	useGetItemsQuery
} from 'src/store/goods.api'

import { Card } from 'src/components/card/Card'
import { Preloader } from 'src/components/preloader/Preloader'

import classes from './mainPage.module.scss'

export const MainPage = memo(() => {
	const [page, setPage] = useState<number>(1)
	const totalCount = 8004
	const limit = 50
	const offset = (page - 1) * limit

	const {
		data: idsData,
		isLoading: idsLoading,
		isFetching: idsFetching,
		refetch: refetchIds
	} = useGetIdsQuery({
		offset,
		limit
	})

	const ids = idsData?.result || []
	const {
		data: items,
		isLoading: itemsLoading,
		isFetching: itemsFetching,
		refetch: refetchItems
	} = useGetItemsQuery({ ids })

	const { data: fields } = useGetFieldsQuery()
	console.log(fields)

	const [uniqueItems, setUniqueItems] = useState<IItems[]>([])

	useEffect(() => {
		if (items && items.result) {
			const uniqueIds = new Set<string>()
			const uniqueItemsArray: IItems[] = []

			items.result.forEach(item => {
				if (!uniqueIds.has(item.id)) {
					uniqueIds.add(item.id)
					uniqueItemsArray.push(item)
				}
			})

			setUniqueItems(uniqueItemsArray)
		}
	}, [items])

	const handleChange = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			setPage(value)
			refetchIds()
			refetchItems()
		},
		[]
	)

	if (idsLoading || itemsLoading || idsFetching || itemsFetching)
		return <Preloader />

	return (
		<>
			<div className={classes.cardSection}>
				{uniqueItems?.map(({ brand, id, price, product }) => (
					<Paper key={id} style={{ padding: '10px' }}>
						<Card id={id} brand={brand} price={price} product={product} />
					</Paper>
				))}
			</div>
			<div className={classes.pagination}>
				<Pagination
					variant='outlined'
					page={page}
					onChange={handleChange}
					count={Math.ceil(totalCount / limit)}
				/>
			</div>
		</>
	)
})
