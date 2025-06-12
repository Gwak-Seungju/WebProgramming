import { cn } from '@bcsdlab/utils';
import styles from './FriendToggleButton.module.scss';
import { useFriendStatus } from '@/pages/BlogPage/hooks/useFriendStatus';

interface FriendToggleButtonProps {
	myId: string;
	targetId: string;
}

export default function FriendToggleButton({
	myId,
	targetId,
}: FriendToggleButtonProps) {
	const { isFriend, addFriend, deleteFriend } = useFriendStatus(myId, targetId);

	if (myId === targetId) {
		return <div className={styles.me}>나</div>;
	}

	return (
		<button
			className={cn({
				[styles.button]: true,
				[styles['button--delete']]: isFriend,
			})}
			onClick={() => (isFriend ? deleteFriend() : addFriend())}
		>
			{isFriend ? '이웃 삭제' : '이웃 추가'}
		</button>
	);
}
