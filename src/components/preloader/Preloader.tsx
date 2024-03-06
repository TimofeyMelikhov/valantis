import classes from './preloader.module.scss'

export const Preloader = () => {
	return (
		<div className={classes.preloaderContainer}>
			<div className={classes.preloaderContainer__preloader}></div>
		</div>
	)
}
