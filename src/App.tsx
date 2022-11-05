import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, About, Weather, NotFound } from './pages';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/weather" element={<Weather />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
