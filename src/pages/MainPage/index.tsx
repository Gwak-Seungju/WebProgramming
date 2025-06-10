import { useNavigate } from 'react-router-dom';
import { useLatestFriendPosts } from './hooks/useLatestFriendPosts';
import styles from './MainPage.module.scss';
import PersonIcon from '@/assets/person.svg';
import PostsList from '@/components/PostsList';
import { useNeighborList } from '@/hooks/neighbor/useNeighborList';
import useUserInfo from '@/hooks/useUserInfo';

export default function MainPage() {
	const navigate = useNavigate();
	const { data: userInfo } = useUserInfo();
	const {
		data: posts,
		isLoading,
		error,
	} = useLatestFriendPosts(userInfo?.user_id ?? null);
	const { data: neighbors } = useNeighborList(userInfo?.user_id ?? null);

	if (isLoading) return <p>불러오는 중...</p>;
	if (error) return <p>에러 발생: {error.message}</p>;

	return (
		<div className={styles.container}>
			<div className={styles.neighborPosts}>
				<h2>이웃 새글</h2>
				{!posts || posts.length === 0 ? (
					<p>이웃 글이 없습니다.</p>
				) : (
					<PostsList posts={posts} />
				)}
			</div>
			<div className={styles.my}>
				<div className={styles.my__info}>
					<div className={styles.my__userInfo}>
						<div className={styles.personIcon}>
							<PersonIcon />
						</div>
						<div className={styles['my__info--name']}>{userInfo?.username}</div>
					</div>
					<button className={styles['my__info--logout']}>로그아웃</button>
				</div>
				<div className={styles.my__blog}>
					<button
						onClick={() => {
							navigate(`/blog/${userInfo?.username}/${userInfo?.user_id}`);
						}}
					>
						내 블로그
					</button>
					<button>글 쓰기</button>
				</div>
				<div className={styles.my__neighbor}>
					<div className={styles['my__neighbor--title']}>이웃 목록</div>
					<div className={styles.neighborList}>
						{(neighbors ?? []).map((neighbor) => (
							<button key={neighbor.id} className={styles.my__userInfo}>
								<div className={styles.personIcon}>
									<PersonIcon />
								</div>
								<div key={neighbor.id} className={styles.neighborList__name}>
									{neighbor.username}
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
