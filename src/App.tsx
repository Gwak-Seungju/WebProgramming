import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<BoardPage />}>
					<Route index element={<MainPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="signup" element={<SignupPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
