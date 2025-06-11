import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface DeletePostParams {
	post_id: number;
	user_id: number;
}

export default function useDeletePost() {
	const queryClient = useQueryClient();
	const userId = localStorage.getItem('user_id');
	return useMutation({
		mutationFn: ({ post_id, user_id }: DeletePostParams) =>
			axios.post(
				'http://localhost/term/post/delete_post.php',
				{ user_id, post_id },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts', userId] });
		},
		onError: (error) => {
			console.error('게시글 삭제 실패:', error);
		},
	});
}
