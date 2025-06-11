import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface EditPostParams {
	user_id: string | number;
	post_id: string | number;
	title: string;
	content: string;
}

export default function useEditPost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: EditPostParams) => {
			const response = await axios.post(
				'http://localhost/term/post/edit_post.php',
				params,
			);
			return response.data;
		},
		onSuccess: () => {
			// 글 수정 성공 시 관련 쿼리 무효화 → 갱신
			queryClient.invalidateQueries({ queryKey: ['postDetail'] });
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
		onError: (error) => {
			console.error('게시글 수정 실패:', error);
		},
	});
}
