import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Comment {
	comment_id: number;
	content: string;
	created_at: string;
	username: string;
	user_id: number;
}

export function useComments(postId: string) {
	return useSuspenseQuery<Comment[]>({
		queryKey: ['comments', postId],
		queryFn: async () => {
			const res = await axios.get(
				'http://localhost/term/post_func/comments.php',
				{
					params: { post_id: postId },
				},
			);
			if (!res.data.success) throw new Error('댓글 불러오기 실패');
			return res.data.comments;
		},
	});
}
