import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface FriendWithStatus {
	id: number;
	username: string;
	isMyFriend: boolean;
}

interface UseFriendListWithStatusParams {
	myId: number;
	targetId: number;
}

export default function useFriendList({
	myId,
	targetId,
}: UseFriendListWithStatusParams) {
	return useQuery<FriendWithStatus[]>({
		queryKey: ['friendListWithStatus', myId, targetId],
		queryFn: async () => {
			const res = await axios.get(
				'http://localhost/term/neighbor/friend_list_with_status.php',
				{
					params: {
						my_id: myId,
						target_id: targetId,
					},
				},
			);

			if (!res.data.success) {
				throw new Error(res.data.error || '이웃 목록을 불러오지 못했습니다.');
			}

			return res.data.friends;
		},
		enabled: !!myId && !!targetId,
	});
}
