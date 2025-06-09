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
		<header>
			<div className={styles.container}>
				<div className={styles.container__left}>
					<button className={styles.logo} onClick={() => navigate('/')}>
						G blog
					</button>
					<div className={styles.search}>
						<input
							type="text"
							className={styles.search__input}
							placeholder="검색어를 입력해주세요"
						/>
						<button className={styles.search__button}>검색</button>
					</div>
				</div>
				<div className={styles.container__right}>
					{userInfo ? (
						<div className={styles.loggedIn}>
							<div className={styles.loggedIn__user}>
								<span>{userInfo.username}</span> 님, 안녕하세요
							</div>
							<div className={styles.loggedIn__menu}>
								<button onClick={() => navigate('/auth/mypage')}>
									마이페이지
								</button>
								<button onClick={logout}>로그아웃</button>
							</div>
						</div>
					) : (
						<button className={styles.login} onClick={() => navigate('/auth')}>
							로그인
						</button>
					)}
				</div>
			</div>
		</header>
	);
}
