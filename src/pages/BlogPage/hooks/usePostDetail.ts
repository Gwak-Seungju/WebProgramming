import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPostDetail = async (postId: string, userId: string) => {
	const res = await axios.get(
		`http://localhost/term/post/post_detail.php?post_id=${postId}&user_id=${userId}`,
	);
	return res.data;
};

export default function usePostDetail(postId: string, userId: string) {
	return useSuspenseQuery({
		queryKey: ['postDetail', postId, userId],
		queryFn: () => fetchPostDetail(postId, userId),
	});
}
