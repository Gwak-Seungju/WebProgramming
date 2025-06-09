import { useLatestFriendPosts } from './hooks/useLatestFriendPosts';
import styles from './MainPage.module.scss';
import PersonIcon from '@/assets/person.svg';
import { useNeighborList } from '@/hooks/neighbor/useNeighborList';
import useUserInfo from '@/hooks/useUserInfo';

export default function MainPage() {
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
					<div className={styles.posts}>
						{posts.map((post) => (
							<div key={post.post_id} className={styles.post}>
								<div className={styles.post__info}>
									<div className={styles.personIcon}>
										<PersonIcon />
									</div>
									<div>
										<div className={styles['post__info--user']}>
											{post.username}
										</div>
										<div className={styles['post__info--time']}>
											{post.created_at}
										</div>
									</div>
								</div>
								<h3 className={styles.post__title}>{post.title}</h3>
								<p className={styles.post__content}>{post.content}</p>
								<div>
									<span>공감: {post.likes_count}</span> |{' '}
									<span>댓글: {post.comments_count}</span>
								</div>
							</div>
						))}
					</div>
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
					<button>내 블로그</button>
					<button>글 쓰기</button>
				</div>
				<div className={styles.my__neighbor}>
					<div>이웃 목록</div>
					<ul className={styles.neighborList}>
						{(neighbors ?? []).map((neighbor) => (
							<div key={neighbor.id}>{neighbor.username}</div>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
