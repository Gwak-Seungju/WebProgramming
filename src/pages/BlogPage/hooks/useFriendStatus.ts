// hooks/useFriendStatus.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useFriendStatus(myId: string, targetId: string) {
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ['isFriend', myId, targetId],
		queryFn: async () => {
			const res = await axios.get(
				`http://localhost/term/neighbor/is_friend.php?my_id=${myId}&target_id=${targetId}`,
			);
			return res.data.isFriend; // true or false
		},
		enabled: !!myId && !!targetId,
	});

	const addFriend = useMutation({
		mutationFn: () =>
			axios.post('http://localhost/term/neighbor/add_friend.php', {
				my_id: myId,
				target_id: targetId,
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['isFriend', myId, targetId] }),
	});

	const deleteFriend = useMutation({
		mutationFn: () =>
			axios.post('http://localhost/term/neighbor/delete_friend.php', {
				my_id: myId,
				target_id: targetId,
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['isFriend', myId, targetId] }),
	});

	return {
		isFriend: data,
		isLoading,
		addFriend: addFriend.mutate,
		deleteFriend: deleteFriend.mutate,
	};
}
