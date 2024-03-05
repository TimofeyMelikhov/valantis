import { IItems } from 'src/models/goodsModel'

export const Card = ({ id, brand, price, product }: IItems) => {
	return (
		<div>
			<div>{id}</div>
			<div>{brand}</div>
			<div>{price}руб</div>
			<div>{product}</div>
			<hr />
		</div>
	)
}
