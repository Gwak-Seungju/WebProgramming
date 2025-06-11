import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Post } from '@/static/post';

interface NeighborResult {
	type: 'neighbor';
	id: number;
	username: string;
	created_at?: string;
}

type SearchData = {
	success: boolean;
	error?: string;
	posts?: Post[];
	neighbors?: NeighborResult[];
};

export const useSearch = (keyword: string, filter: 'post' | 'neighbor') => {
	const userId = localStorage.getItem('user_id');
	return useQuery<SearchData>({
		queryKey: ['search', userId, keyword, filter],
		queryFn: async () => {
			if (!userId || !keyword) {
				return {
					success: false,
					error: 'user_id and keyword are required',
				};
			}

			const { data } = await axios.get<SearchData>(
				`http://localhost/term/neighbor/search.php`,
				{
					params: {
						user_id: userId,
						query: keyword,
						filter,
					},
				},
			);

			return data;
		},
		enabled: !!userId && !!keyword,
	});
};
