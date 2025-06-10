import { useParams } from 'react-router-dom';
import styles from './BlogPage.module.scss';
import FriendToggleButton from './components/FriendToggleButton';
import { usePosts } from './hooks/usePosts';
import PostsList from '@/components/PostsList';

export default function BlogPage() {
	const params = useParams();
	const userId = localStorage.getItem('user_id');
	const { data: posts } = usePosts(params.userId!);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{params?.userName}님의 블로그</h1>
				{userId !== params.userId && (
					<FriendToggleButton myId={userId!} targetId={params.userId!} />
				)}
			</div>
			<PostsList posts={posts!} />
		</div>
	);
}
