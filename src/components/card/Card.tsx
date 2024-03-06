import { memo } from 'react'
import { IItems } from 'src/models/goodsModel'
import { formatCompactNum } from 'src/utils/formatter'

import classes from './card.module.scss'

export const Card = memo(({ id, brand, price, product }: IItems) => {
	const brandItem = brand ? brand : 'Неизвестно'
	return (
		<div className={classes.card}>
			<div>
				<span className={classes.tag}>id:</span> {id}
			</div>
			<div>
				<span className={classes.tag}>Брэнд:</span> {brandItem}
			</div>
			<div>
				<span className={classes.tag}>Стоимость:</span>
				{formatCompactNum(price)}руб.
			</div>
			<div>
				<span className={classes.tag}>Наименование товара:</span> {product}
			</div>
		</div>
	)
})
