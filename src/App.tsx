import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, About, Weather, NotFound } from './pages';
import Navbar from './layout/Navbar';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
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
