import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Friend {
	id: number;
	username: string;
	created_at: string;
}

export const useNeighborList = (userId: number | null) => {
	return useQuery<Friend[]>({
		queryKey: ['friendList', userId],
		queryFn: async () => {
			const { data } = await axios.get(
				`http://localhost/term/neighbor/get_friend.php?user_id=${userId}`,
			);

			if (!data.success) {
				throw new Error(data.error || '이웃 목록을 불러오는 데 실패했습니다.');
			}

			return data.friends;
		},
		enabled: !!userId, // userId가 있을 때만 실행
		staleTime: 1000 * 60 * 3, // 3분간 캐시
	});
};
