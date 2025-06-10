import { useFriendStatus } from '@/pages/BlogPage/hooks/useFriendStatus';

interface FriendToggleButtonProps {
	myId: string;
	targetId: string;
}

export default function FriendToggleButton({
	myId,
	targetId,
}: FriendToggleButtonProps) {
	const { isFriend, isLoading, addFriend, deleteFriend } = useFriendStatus(
		myId,
		targetId,
	);

	if (isLoading) return <button disabled>로딩 중...</button>;

	return (
		<button onClick={() => (isFriend ? deleteFriend() : addFriend())}>
			{isFriend ? '이웃 삭제' : '이웃 추가'}
		</button>
	);
}
