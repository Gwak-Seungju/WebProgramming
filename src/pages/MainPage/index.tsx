import { cn } from '@bcsdlab/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLatestFriendPosts } from './hooks/useLatestFriendPosts';
import styles from './MainPage.module.scss';
import PersonIcon from '@/assets/person.svg';
import PostsList from '@/components/PostsList';
import { useNeighborList } from '@/hooks/neighbor/useNeighborList';
import useUserInfo from '@/hooks/useUserInfo';

export default function MainPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: userInfo } = useUserInfo();
	const {
		data: posts,
		isLoading,
		error,
	} = useLatestFriendPosts(userInfo?.user_id ?? null);
	const { data: neighbors } = useNeighborList(userInfo?.user_id ?? null);

	const goNeighborBlog = (id: number, name: string) => {
		navigate(`/blog/${name}/${id}`);
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

	if (isLoading) return <p>불러오는 중...</p>;
	if (error) return <p>에러 발생: {error.message}</p>;

	return (
		<div className={styles.container}>
			<div className={styles.neighborPosts}>
				<h2>이웃 새글</h2>
				{userInfo ? (
					!posts || posts.length === 0 ? (
						<p>이웃 글이 없습니다.</p>
					) : (
						<PostsList posts={posts} />
					)
				) : (
					<p>
						<button
							className={styles.neighborPosts__button}
							onClick={() => navigate('/auth')}
						>
							로그인
						</button>
						하여 이웃의 글을 확인해보세요.
					</p>
				)}
			</div>
			<div className={styles.my}>
				<div className={styles.my__info}>
					<div className={styles.my__userInfo}>
						<div className={styles.personIcon}>
							<PersonIcon />
						</div>
						<div
							className={cn({
								[styles['my__info--name']]: true,
								[styles['my__info--name--nonLogin']]: !userInfo,
							})}
						>
							{userInfo?.username || '로그인하세요'}
						</div>
					</div>
					{userInfo && (
						<button className={styles['my__info--logout']} onClick={logout}>
							로그아웃
						</button>
					)}
				</div>
				<div className={styles.my__blog}>
					<button
						onClick={() => {
							if (!userInfo) {
								toast('로그인 후 이용가능합니다.', { type: 'warning' });
								return;
							}
							navigate(`/blog/${userInfo?.username}/${userInfo?.user_id}`);
						}}
					>
						내 블로그
					</button>
					<button
						onClick={() => {
							if (!userInfo) {
								toast('로그인 후 이용가능합니다.', { type: 'warning' });
								return;
							}
							navigate('/write');
						}}
					>
						글 쓰기
					</button>
				</div>
				<div className={styles.my__neighbor}>
					<div className={styles['my__neighbor--title']}>이웃 목록</div>
					<div className={styles.neighborList}>
						{!neighbors || neighbors.length === 0 ? (
							<div className={styles.guide}>
								현재 이웃이 없습니다. <br /> 이웃을 추가해보세요.
							</div>
						) : (
							neighbors.map((neighbor) => (
								<button
									key={neighbor.id}
									className={styles.my__userInfo}
									onClick={() => goNeighborBlog(neighbor.id, neighbor.username)}
								>
									<div className={styles.personIcon}>
										<PersonIcon />
									</div>
									<div key={neighbor.id} className={styles.neighborList__name}>
										{neighbor.username}
									</div>
								</button>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
