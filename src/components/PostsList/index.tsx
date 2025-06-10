import styles from './PostsList.module.scss';
import type { Post } from '@/pages/MainPage/hooks/useLatestFriendPosts';
import PersonIcon from '@/assets/person.svg';

interface PostsListProps {
	posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
	return (
		<div className={styles.posts}>
			{posts.map((post) => (
				<div key={post.post_id} className={styles.post}>
					<button className={styles.post__info}>
						<div className={styles.personIcon}>
							<PersonIcon />
						</div>
						<div>
							<div className={styles['post__info--user']}>{post.username}</div>
							<div className={styles['post__info--time']}>
								{post.created_at}
							</div>
						</div>
					</button>
					<h3 className={styles.post__title}>{post.title}</h3>
					<p className={styles.post__content}>{post.content}</p>
					<div>
						<span>공감: {post.likes_count}</span> |{' '}
						<span>댓글: {post.comments_count}</span>
					</div>
				</div>
			))}
		</div>
	);
}
