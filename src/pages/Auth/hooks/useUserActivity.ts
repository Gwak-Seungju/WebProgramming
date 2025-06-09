import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UserActivity {
	post_count: number;
	friend_count: number;
}

export const useUserActivity = (user_id: number) => {
	return useSuspenseQuery<UserActivity>({
		queryKey: ['userActivity', user_id],
		queryFn: async () => {
			const { data } = await axios.get(
				`http://localhost/term/activity.php?user_id=${user_id}`,
			);
			if (!data.success) throw new Error('불러오기 실패');
			return {
				post_count: data.post_count,
				friend_count: data.friend_count,
			};
		},
	});
};
