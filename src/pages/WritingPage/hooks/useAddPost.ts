import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface AddPostInput {
	user_id: number;
	title: string;
	content: string;
}

export default function useAddPost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ user_id, title, content }: AddPostInput) => {
			const res = await axios.post('http://localhost/term/post/add_post.php', {
				user_id,
				title,
				content,
			});

			if (!res.data.success) {
				throw new Error(res.data.error || '게시글 작성에 실패했습니다.');
			}

			return res.data;
		},
		onSuccess: () => {
			// 게시글 목록 캐시 갱신
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});
}
