import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Post } from '@/static/post';

export const useLatestFriendPosts = (user_id: number | null) => {
	return useSuspenseQuery<Post[]>({
		queryKey: ['latestFriendPosts', user_id],
		queryFn: async () => {
			if (!user_id) return []; // return empty array if no user_id
			const { data } = await axios.get(
				`http://localhost/term/neighbor/latest_friend_posts.php?user_id=${user_id}`,
			);

			if (!data.success) {
				throw new Error(data.error || '이웃 글을 불러오지 못했습니다.');
			}

			return data.posts;
		},
		staleTime: 1000 * 60 * 3, // 3분간 캐시
	});
};
