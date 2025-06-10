import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAddPost from './hooks/useAddPost';
import useUserInfo from '@/hooks/useUserInfo';

export default function WritingPage() {
	const navigate = useNavigate();
	const { data: userInfo } = useUserInfo();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const { mutate: addPost, isPending } = useAddPost();

	const handleSubmit = () => {
		if (!userInfo?.user_id || !title.trim() || !content.trim()) {
			toast('모든 필드를 입력하세요.', { type: 'warning' });
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
		<div>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="제목을 입력하세요"
			/>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="내용을 입력하세요"
			/>
			<button onClick={handleSubmit} disabled={isPending}>
				{isPending ? '작성 중...' : '작성하기'}
			</button>
		</div>
	);
}
