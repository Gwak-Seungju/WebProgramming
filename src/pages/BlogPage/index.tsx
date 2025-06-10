import { useNavigate, useParams } from 'react-router-dom';
import styles from './BlogPage.module.scss';
import FriendToggleButton from './components/FriendToggleButton';
import { usePosts } from './hooks/usePosts';
import PostsList from '@/components/PostsList';
import PostDetail from '@/pages/BlogPage/components/PostDetail';

export default function BlogPage() {
	const { userId, userName, postId } = useParams();
	const navigate = useNavigate();
	const myId = localStorage.getItem('user_id');
	const { data: posts } = usePosts(userId!);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{userName}님의 블로그</h1>
				{myId !== userId ? (
					<button className={styles.header__button}>
						<FriendToggleButton myId={myId!} targetId={userId!} />
					</button>
				) : (
					<button onClick={() => navigate('/write')}>글 쓰기</button>
				)}
			</div>
			{postId ? <PostDetail /> : <PostsList posts={posts!} />}
		</div>
	);
}
