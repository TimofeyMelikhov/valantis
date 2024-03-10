import { Paper } from '@mui/material'
import { Pagination } from '@mui/material'
import { memo, useCallback, useEffect, useState } from 'react'
import { IIds, IItems } from 'src/models/goodsModel'
import {
	// useGetFieldsQuery,
	useGetIdsQuery,
	useGetItemsQuery // useLazyGetFilteredItemsQuery
	// useLazyGetFilteredItemsQuery
} from 'src/store/goods.api'

import { Card } from 'src/components/card/Card'
// import { Select } from 'src/components/mainSelect/MainSelect'
import { Preloader } from 'src/components/preloader/Preloader'

import classes from './mainPage.module.scss'

export const MainPage = memo(() => {
	const [page, setPage] = useState<number>(1)
	const [ids, setIds] = useState<IIds>()
	// const [selectedValue, setSelectedValue] = useState<string>('')
	const totalCount = 8004
	const limit = 50
	const offset = (page - 1) * limit

	const {
		data: idsData,
		isLoading: idsLoading,
		isFetching: idsFetching,
		error: idsError,
		refetch: refetchIds
	} = useGetIdsQuery({
		offset,
		limit
	})

	useEffect(() => {
		if (idsData) {
			setIds(idsData.result)
		}
	}, [idsData])

	const {
		data: items,
		isLoading: itemsLoading,
		isFetching: itemsFetching,
		error: itemsError,
		refetch: refetchItems
	} = useGetItemsQuery({ ids })

	useEffect(() => {
		if (itemsError || idsError) {
			console.error(
				'Error occurred while fetching items:',
				itemsError || idsError
			)
			refetchIds()
			refetchItems()
		}
	}, [idsError, itemsError, refetchIds, refetchItems])

	// const { data: fields } = useGetFieldsQuery()

	const [uniqueItems, setUniqueItems] = useState<IItems[]>([])

	// const options = fields?.result.map(option => ({
	// 	value: option,
	// 	label: option
	// }))

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

	const handleChangePage = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			setPage(value)
			refetchIds()
			refetchItems()
		},
		[refetchIds, refetchItems]
	)

	// const selectHandleChange = useCallback(
	// 	(event: React.ChangeEvent<HTMLSelectElement>) => {
	// 		const value = event.target.value
	// 		setSelectedValue(value)
	// 	},
	// 	[]
	// )
	// const [filterItems, { data: filteredId }] = useLazyGetFilteredItemsQuery()

	// useEffect(() => {
	// 	if (!filteredId) {
	// 		filterItems(selectedValue)
	// 	}
	// 	setIds(filteredId?.result)
	// 	refetchItems()
	// }, [filterItems, filteredId, refetchItems, selectedValue])

	if (idsLoading || itemsLoading || idsFetching || itemsFetching) {
		return <Preloader />
	} else {
		return (
			<>
				{/* <div>
					<Select
						options={options || []}
						value={selectedValue}
						onChange={selectHandleChange}
					/>
				</div> */}
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
						onChange={handleChangePage}
						count={Math.ceil(totalCount / limit)}
					/>
				</div>
			</>
		)
	}
})
