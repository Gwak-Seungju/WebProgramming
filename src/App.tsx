import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Auth from './pages/Auth';
import LoginPage from './pages/Auth/LoginPage';
import MyPage from './pages/Auth/MyPage';
import SignupPage from './pages/Auth/SignupPage';
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<BoardPage />}>
					<Route index element={<MainPage />} />
				</Route>
				<Route path="/auth" element={<Auth />}>
					<Route index element={<LoginPage />} />
					<Route path="/auth/signup" element={<SignupPage />} />
					<Route path="/auth/mypage" element={<MyPage />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
