import { MainPage } from './pages/MainPage'

import classes from './app.module.scss'

export const App = () => {
	return (
		<div className={classes.container}>
			<MainPage />
		</div>
	)
}
