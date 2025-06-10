import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Post } from '@/utils/post';

const fetchPosts = async (userId: number): Promise<Post[]> => {
	const { data } = await axios.get('http://localhost/term/posts.php', {
		params: { user_id: userId },
	});

	if (!data.success) throw new Error(data.error || 'Failed to fetch posts');
	return data.posts;
};

export const usePosts = (userId: number) => {
	return useQuery({
		queryKey: ['posts', userId],
		queryFn: () => fetchPosts(userId),
		enabled: !!userId, // userId가 있어야 실행
	});
};
