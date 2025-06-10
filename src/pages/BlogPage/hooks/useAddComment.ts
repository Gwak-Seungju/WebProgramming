// hooks/useAddComment.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface AddCommentInput {
	user_id: string;
	post_id: string;
	content: string;
}

export function useAddComment(postId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ user_id, post_id, content }: AddCommentInput) => {
			const res = await axios.post(
				'http://localhost/term/post_func/add_comment.php',
				{
					user_id,
					post_id,
					content,
				},
			);
			if (!res.data.success)
				throw new Error(res.data.error || '댓글 등록 실패');
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['postDetail', postId],
			});
			queryClient.invalidateQueries({
				queryKey: ['comments', postId],
			});
		},
	});
}
