import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import usePostDetail from '../BlogPage/hooks/usePostDetail';
import useAddPost from './hooks/useAddPost';
import useEditPost from './hooks/useEditPost';
import styles from './WritingPage.module.scss';
import useUserInfo from '@/hooks/useUserInfo';

export default function WritingPage() {
	const navigate = useNavigate();
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const { data: userInfo } = useUserInfo();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const { mutate: addPost, isPending } = useAddPost();
	const { mutate: editPost } = useEditPost();

	const [searchParams] = useSearchParams();
	const postId = searchParams.get('postId');
	const { data: postData } = usePostDetail(postId!, userInfo!.user_id);

	useEffect(() => {
		if (postData) {
			const post = postData.post;
			setTitle(post.title);
			setContent(post.content);
		}
	}, [postData]);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'; // 초기화
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 실제 내용만큼 확장
		}
	}, [content]); // content가 바뀔 때마다 호출

	const handleSubmit = () => {
		if (!userInfo?.user_id || !title.trim() || !content.trim()) {
			toast('모든 필드를 입력하세요.', { type: 'warning' });
			return;
		}

		if (postId) {
			editPost(
				{
					user_id: userInfo.user_id,
					post_id: postId,
					title,
					content,
				},
				{
					onSuccess: () => {
						navigate(`/blog/${userInfo?.username}/${userInfo?.user_id}`);
						toast('게시글이 수정되었습니다.', { type: 'success' });
					},
					onError: (err: any) => {
						alert(err.message);
					},
				},
			);
			return;
		}

		addPost(
			{ user_id: userInfo.user_id, title, content },
			{
				onSuccess: () => {
					navigate(`/blog/${userInfo?.username}/${userInfo?.user_id}`);
					toast('게시글이 작성되었습니다.', { type: 'success' });
				},
				onError: (err: any) => {
					alert(err.message);
				},
			},
		);
	};

	return (
		<div className={styles.container}>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="제목을 입력하세요"
				className={styles.container__title}
			/>
			<textarea
				ref={textareaRef}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="내용을 입력하세요"
				className={styles.container__content}
			/>
			<button
				onClick={handleSubmit}
				className={styles.container__button}
				disabled={isPending}
			>
				{postId ? '수정하기' : '작성하기'}
			</button>
		</div>
	);
}
