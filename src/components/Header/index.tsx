import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import useUserInfo from '@/hooks/useUserInfo';

export default function Header() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: userInfo } = useUserInfo();

	const logout = () => {
		localStorage.removeItem('user_id');
		queryClient.removeQueries({ queryKey: ['userInfo'] });
		if (window.location.pathname === '/') {
			navigate(0);
		} else {
			navigate('/');
		}
	};

	return (
		<div className={styles.container}>
			<div>G blog</div>
			<div>
				<input type="text" />
				<button>검색</button>
			</div>
			<div>
				{userInfo ? (
					<div>
						<div>{userInfo.username} 님, 안녕하세요</div>
						<div>
							<button onClick={() => navigate('/auth/mypage')}>
								마이페이지
							</button>
							<button onClick={logout}>로그아웃</button>
						</div>
					</div>
				) : (
					<button onClick={() => navigate('/auth')}>로그인</button>
				)}
			</div>
		</div>
	);
}
