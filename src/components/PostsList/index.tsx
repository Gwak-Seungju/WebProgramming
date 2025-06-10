import { useNavigate } from 'react-router-dom';
import styles from './PostsList.module.scss';
import type { Post } from '@/utils/post';
import PersonIcon from '@/assets/person.svg';

interface PostsListProps {
	posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
	const navigate = useNavigate();

	const goNeighborBlog = (id: number, name: string) => {
		navigate(`/blog/${name}/${id}`);
	};

	const goDetailPost = (userId: number, name: string, postId: number) => {
		navigate(`/blog/${name}/${userId}/${postId}`);
	};

	if (!posts || posts.length === 0) return <p>등록된 글이 없습니다.</p>;

	return (
		<div className={styles.posts}>
			{posts.map((post) => (
				<div key={post.post_id} className={styles.post}>
					<button
						className={styles.post__info}
						onClick={() => goNeighborBlog(post.user_id, post.username)}
					>
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
					<h3
						className={styles.post__title}
						onClick={() => {
							goDetailPost(post.user_id, post.username, post.post_id);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								goDetailPost(post.user_id, post.username, post.post_id);
							}
						}}
						tabIndex={0}
						role="button"
					>
						{post.title}
					</h3>
					<p
						className={styles.post__content}
						onClick={() => {
							goDetailPost(post.user_id, post.username, post.post_id);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								goDetailPost(post.user_id, post.username, post.post_id);
							}
						}}
						tabIndex={0}
						role="button"
					>
						<span className={styles['post__content--r']}>{post.content}</span>
					</p>
					<div>
						<span>공감: {post.likes_count}</span> |{' '}
						<span>댓글: {post.comments_count}</span>
					</div>
				</div>
			))}
		</div>
	);
}
