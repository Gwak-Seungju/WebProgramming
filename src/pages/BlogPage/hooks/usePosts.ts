import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Post } from '@/utils/post';

const fetchPosts = async (userId: string): Promise<Post[]> => {
	const { data } = await axios.get('http://localhost/term/post/posts.php', {
		params: { user_id: userId },
	});

	if (!data.success) throw new Error(data.error || 'Failed to fetch posts');
	return data.posts;
};

export const usePosts = (userId: string) => {
	return useSuspenseQuery({
		queryKey: ['posts', userId],
		queryFn: () => fetchPosts(userId),
	});
};
