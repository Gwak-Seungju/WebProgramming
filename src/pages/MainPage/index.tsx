import { useLatestFriendPosts } from './hooks/useLatestFriendPosts';
import styles from './MainPage.module.scss';
import useUserInfo from '@/hooks/useUserInfo';

export default function MainPage() {
	const { data: userInfo } = useUserInfo();
	const {
		data: posts,
		isLoading,
		error,
	} = useLatestFriendPosts(userInfo!.user_id);

	if (isLoading) return <p>불러오는 중...</p>;
	if (error) return <p>에러 발생: {error.message}</p>;

	return (
		<div className={styles.container}>
			<div className={styles.writings}>
				<h3>이웃 새글</h3>
				{!posts || posts.length === 0 ? (
					<p>이웃 글이 없습니다.</p>
				) : (
					<ul>
						{posts.map((post) => (
							<li key={post.post_id}>
								<h4>{post.title}</h4>
								<p>{post.content}</p>
								<div>
									<span>작성자: {post.username}</span> |{' '}
									<span>좋아요: {post.likes_count}</span> |{' '}
									<span>댓글: {post.comments_count}</span>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className={styles.my}>
				<div className={styles.my__info}>
					<div className={styles['my__info--name']}>승주</div>
					<button className={styles['my__info--logout']}>로그아웃</button>
				</div>
				<div className={styles.my__blog}>
					<button>내 블로그</button>
					<button>글 쓰기</button>
				</div>
				<div className={styles.my__neighbor}>
					<div>이웃 목록</div>
					<ul></ul>
				</div>
			</div>
		</div>
	);
}
