import { useState } from 'react';
import { cn } from '@bcsdlab/utils';
import ChevronDownIcon from 'assets/chevron-down.svg';
import CommentIcon from 'assets/comment.svg';
import EmptyLikeIcon from 'assets/empty-like.svg';
import LikeIcon from 'assets/like.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddComment } from '../../hooks/useAddComment';
import { useComments } from '../../hooks/useComments';
import useToggleLike from '../../hooks/useToggleLike';
import styles from './PostDetail.module.scss';
import PersonIcon from '@/assets/person.svg';
import useUserInfo from '@/hooks/useUserInfo';
import usePostDetail from '@/pages/BlogPage/hooks/usePostDetail';

export default function PostDetailPage() {
	const userId = localStorage.getItem('user_id');
	const { data: userInfo } = useUserInfo();
	const { postId } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, error } = usePostDetail(postId!, userId!);
	const { data: comments } = useComments(postId!);
	const { mutate: addComment } = useAddComment(postId!);
	const { mutate: toggleLike } = useToggleLike(postId!);

	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [commentText, setCommentText] = useState('');

	const goNeighborBlog = (id: number, name: string) => {
		navigate(`/blog/${name}/${id}`);
	};

	const handleLike = () => {
		toggleLike({
			userId: userId!,
			postId: postId!,
		});
	};

	const handleSubmit = () => {
		if (!commentText.trim()) return;
		addComment(
			{
				user_id: userId!,
				post_id: postId!,
				content: commentText,
			},
			{
				onSuccess: () => {
					setCommentText('');
				},
			},
		);
	};

	if (isLoading) return <p>불러오는 중...</p>;
	if (error || !data.success) return <p>에러 발생</p>;

	const post = data.post;
	console.log(isCommentOpen);

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>{post.title}</h1>
				<button
					className={styles.user}
					onClick={() => goNeighborBlog(post.user_id, post.username)}
				>
					<div className={styles.personIcon}>
						<PersonIcon />
					</div>
					<div className={styles.user__name}>{post.username}</div>
					<div className={styles.user__time}>{post.created_at}</div>
				</button>
			</div>
			<p className={styles.content}>{post.content}</p>
			<div className={styles.buttonContainer}>
				<button className={styles.buttonContainer__button} onClick={handleLike}>
					{post.is_liked ? <LikeIcon /> : <EmptyLikeIcon />}
					<div>공감</div>
					{post.likes_count}
				</button>
				<button
					className={styles.buttonContainer__button}
					onClick={() => setIsCommentOpen((state) => !state)}
				>
					<CommentIcon />
					<div>댓글</div>
					{post.comments_count}
					<div
						className={cn({
							[styles.chevronDown]: true,
							[styles['chevronDown--reverse']]: isCommentOpen,
						})}
					>
						<ChevronDownIcon />
					</div>
				</button>
				{isCommentOpen && (
					<div className={styles.commentContainer}>
						{comments.map((comment) => (
							<div className={styles.commentContainer__comment}>
								<button
									className={styles.user}
									onClick={() =>
										goNeighborBlog(comment.user_id, comment.username)
									}
								>
									<div className={styles.personIcon}>
										<PersonIcon />
									</div>
									<div className={styles.user__name}>{comment.username}</div>
								</button>
								<div className={styles['commentContainer__comment--content']}>
									{comment.content}
								</div>
								<div className={styles.user__time}>{comment.created_at}</div>
							</div>
						))}
						<div className={styles.textarea}>
							<button
								className={styles.user}
								onClick={() =>
									goNeighborBlog(userInfo!.user_id, userInfo!.username)
								}
							>
								<div className={styles.personIcon}>
									<PersonIcon />
								</div>
								<div className={styles.user__name}>{userInfo?.username}</div>
							</button>
							<textarea
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
								placeholder="댓글을 입력하세요"
								className={styles.textarea__input}
							/>
							<button
								className={styles.textarea__button}
								onClick={handleSubmit}
							>
								등록
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
