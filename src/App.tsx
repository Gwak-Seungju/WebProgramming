import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth';
import LoginPage from './pages/Auth/LoginPage';
import MyPage from './pages/Auth/MyPage';
import SignupPage from './pages/Auth/SignupPage';
import BlogPage from './pages/BlogPage';
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<BoardPage />}>
					<Route index element={<MainPage />} />
					<Route path="/blog/:userId" element={<BlogPage />} />
					<Route path="/search" element={<SearchPage />} />
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
