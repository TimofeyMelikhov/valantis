import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { App } from './App.tsx'
import './assets/style/index.scss'
import { store } from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
)
