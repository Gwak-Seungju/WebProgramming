import styles from './NeighborListModal.module.scss';
import type { FriendWithStatus } from '@/hooks/neighbor/useFriendList';
import type { Friend } from '@/hooks/neighbor/useNeighborList';
import { useOutsideClick } from '@/utils/useOutsideClick';

export default function NeighborListModal({
	onClose,
	neighborList,
}: {
	onClose: () => void;
	neighborList: Friend[] | FriendWithStatus[];
}) {
	const { backgroundRef } = useOutsideClick({ onOutsideClick: onClose });
	return (
		<div ref={backgroundRef} className={styles.background}>
			<div className={styles.container}>
				<div>이웃 목록</div>
				<div>
					{neighborList.map((neighbor) => (
						<div>{neighbor.username}</div>
					))}
				</div>
			</div>
			<button onClick={onClose}>닫기</button>
		</div>
	);
}
