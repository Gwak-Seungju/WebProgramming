import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './PostsList.module.scss';
import type { Post } from '@/static/post';
import MenuIcon from '@/assets/menu.svg';
import PersonIcon from '@/assets/person.svg';
import useDeletePost from '@/pages/WritingPage/hooks/useDeletePost';
import { useOutsideClick } from '@/utils/useOutsideClick';

interface PostsListProps {
	posts: Post[];
}

function PostMenu({ userId, postId }: { userId: number; postId: number }) {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { containerRef } = useOutsideClick({
		onOutsideClick: () => setIsMenuOpen(false),
	});
	const { mutate: deletePost } = useDeletePost();

	const editPost = () => {
		navigate(`/write?postId=${postId}`);
	};

	const handleDelete = () => {
		deletePost(
			{ post_id: postId, user_id: userId },
			{
				onSuccess: () => {
					toast.success('게시글이 삭제되었습니다.');
				},
				onError: (err: any) => {
					toast.error(err.message);
				},
			},
		);
		setIsMenuOpen(false);
	};

	return (
		<div className={styles.postMenu} ref={containerRef}>
			<button
				className={styles.postMenu__dropdown}
				onClick={() => setIsMenuOpen((state) => !state)}
			>
				<MenuIcon />
			</button>
			{isMenuOpen && (
				<div className={styles.menu}>
					<button className={styles.menu__button} onClick={() => editPost()}>
						글 수정
					</button>
					<button
						className={styles.menu__button}
						onClick={() => handleDelete()}
					>
						글 삭제
					</button>
				</div>
			)}
		</div>
	);
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
					<div className={styles.post__header}>
						<button
							className={styles.post__info}
							onClick={() => goNeighborBlog(post.user_id, post.username)}
						>
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
						</button>
						<PostMenu userId={post.user_id} postId={post.post_id} />
					</div>
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
