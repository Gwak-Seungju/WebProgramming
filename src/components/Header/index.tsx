import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ChevronDownIcon from 'assets/chevron-down.svg';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import useUserInfo from '@/hooks/useUserInfo';
import { useOutsideClick } from '@/utils/useOutsideClick';

export default function Header() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: userInfo } = useUserInfo();
	const [keyword, setKeyword] = useState('');
	const [filter, setFilter] = useState<'post' | 'neighbor'>('post');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { containerRef } = useOutsideClick({
		onOutsideClick: () => setIsMenuOpen(false),
	});

	const handleSearch = () => {
		navigate(`/search?keyword=${encodeURIComponent(keyword)}&filter=${filter}`);
	};

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
						<div className={styles.searchMenu} ref={containerRef}>
							<button
								className={styles.searchMenu__dropdown}
								onClick={() => setIsMenuOpen((state) => !state)}
							>
								<div>{filter}</div>
								<ChevronDownIcon />
							</button>
							{isMenuOpen && (
								<div className={styles.menu}>
									<button
										className={styles.menu__button}
										onClick={() => {
											setFilter('post');
											setIsMenuOpen(false);
										}}
									>
										post
									</button>
									<button
										className={styles.menu__button}
										onClick={() => {
											setFilter('neighbor');
											setIsMenuOpen(false);
										}}
									>
										neighbor
									</button>
								</div>
							)}
						</div>
						<input
							type="text"
							className={styles.search__input}
							placeholder={
								userInfo ? '검색어를 입력해주세요' : '로그인 후 사용가능합니다.'
							}
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									handleSearch();
								}
							}}
							disabled={!userInfo}
						/>
						<button
							className={styles.search__button}
							onClick={handleSearch}
							disabled={!userInfo}
						>
							검색
						</button>
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
								|<button onClick={logout}>로그아웃</button>
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
