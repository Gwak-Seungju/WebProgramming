import { useNavigate } from 'react-router-dom';
import FriendToggleButton from '../FriendToggleButton';
import styles from './NeighborListModal.module.scss';
import type { FriendWithStatus } from '@/hooks/neighbor/useFriendList';
import type { Friend } from '@/hooks/neighbor/useNeighborList';
import CloseIcon from '@/assets/close.svg';
import PersonIcon from '@/assets/person.svg';
import { useOutsideClick } from '@/utils/useOutsideClick';

export default function NeighborListModal({
	onClose,
	neighborList,
}: {
	onClose: () => void;
	neighborList: Friend[] | FriendWithStatus[];
}) {
	const { backgroundRef } = useOutsideClick({ onOutsideClick: onClose });
	const navigate = useNavigate();
	const userId = localStorage.getItem('user_id');

	const goNeighborBlog = (id: number, name: string) => {
		navigate(`/blog/${name}/${id}`);
		onClose();
	};
	return (
		<div ref={backgroundRef} className={styles.background}>
			<div className={styles.container}>
				<div className={styles.container__header}>
					<div className={styles['container__header--title']}>이웃 목록</div>
					<button
						className={styles['container__header--close']}
						onClick={onClose}
					>
						<CloseIcon />
					</button>
				</div>
				{!neighborList || neighborList.length === 0 ? (
					<div className={styles.container__content}>이웃이 없습니다.</div>
				) : (
					<div className={styles.container__content}>
						{neighborList.map((neighbor) => (
							<div className={styles.neighborContainer}>
								<button
									className={styles.user}
									onClick={() => goNeighborBlog(neighbor.id, neighbor.username)}
								>
									<div className={styles.personIcon}>
										<PersonIcon />
									</div>
									<div className={styles.user__name}>{neighbor.username}</div>
								</button>
								<div className={styles.neighborContainer__act}>
									<FriendToggleButton
										myId={String(userId)}
										targetId={String(neighbor.id)}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
