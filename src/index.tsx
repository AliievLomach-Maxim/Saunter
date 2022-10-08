import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
import App from './App'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
