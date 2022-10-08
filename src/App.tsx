import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.less'
import { MainPage } from './pages/MainPage/MainPage'
import { PathDetails } from './pages/DetailsPage/PathDetails'
import { AddPath } from './pages/AddPage/AddPath'
import { PathDetailsEmpty } from './pages/DetailsPage/PathDetailsEmpty'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainPage />}>
					<Route path='/' element={<PathDetailsEmpty />} />
					<Route path='/add' element={<AddPath />} />
					<Route path='/:id' element={<PathDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
