import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface ToggleLikeParams {
	userId: string;
	postId: string;
}

export default function useToggleLike(postId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ userId, postId }: ToggleLikeParams) =>
			axios.post('http://localhost/term/post_func/toggle_like.php', {
				user_id: Number(userId),
				post_id: Number(postId),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['postDetail', postId] });
		},
	});
}
