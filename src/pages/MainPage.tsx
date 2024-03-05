import { useGetIdsQuery, useGetItemsQuery } from 'src/store/goods.api'

import { Card } from 'src/components/card/Card'

export const MainPage = () => {
	const { data: ids, isLoading: idsLoading } = useGetIdsQuery({
		offset: 0,
		limit: 3
	})
	const { data: items, isLoading: itemsLoading } = useGetItemsQuery(
		ids && {
			ids: ids?.result
		}
	)

	if (idsLoading || itemsLoading) return <div>Loading...</div>

	return (
		<div>
			{items?.result.map(({ brand, id, price, product }) => (
				<Card key={id} id={id} brand={brand} price={price} product={product} />
			))}
		</div>
	)
}
