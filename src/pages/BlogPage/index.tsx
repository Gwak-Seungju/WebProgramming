import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './BlogPage.module.scss';
import FriendToggleButton from './components/FriendToggleButton';
import NeighborListModal from './components/NeighborListModal';
import { usePosts } from './hooks/usePosts';
import type { FriendWithStatus } from '@/hooks/neighbor/useFriendList';
import PostsList from '@/components/PostsList';
import useFriendList from '@/hooks/neighbor/useFriendList';
import { useNeighborList, type Friend } from '@/hooks/neighbor/useNeighborList';
import PostDetail from '@/pages/BlogPage/components/PostDetail';

export default function BlogPage() {
	const { userId, userName, postId } = useParams();
	const navigate = useNavigate();
	const myId = localStorage.getItem('user_id');

	const { data: posts } = usePosts(userId!);
	const { data: myNeighbors } = useNeighborList(Number(myId));
	const { data: friendNeighbors } = useFriendList({
		myId: Number(myId!),
		targetId: Number(userId!),
	});

	const [isNeighborModalOpen, setIsNeighborModalOpen] = useState(false);
	const [neighborList, setNeighborList] = useState<
		Friend[] | FriendWithStatus[]
	>([]);

	useEffect(() => {
		if (!myId || !userId) return;

		if (myId === userId) {
			if (myNeighbors) setNeighborList(myNeighbors);
		} else {
			if (friendNeighbors) setNeighborList(friendNeighbors);
		}
	}, [myId, userId, myNeighbors, friendNeighbors]);

	const openNeighborList = () => {
		setIsNeighborModalOpen(true);
	};

	const closeModal = () => {
		setIsNeighborModalOpen(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					<h1>{userName}님의 블로그</h1>
					<button onClick={openNeighborList}>이웃 목록</button>
				</div>
				{myId !== userId ? (
					<div className={styles.header__button}>
						<FriendToggleButton myId={myId!} targetId={userId!} />
					</div>
				) : (
					<button onClick={() => navigate('/write')}>글 쓰기</button>
				)}
			</div>
			{postId ? <PostDetail /> : <PostsList posts={posts!} />}
			{isNeighborModalOpen && (
				<NeighborListModal onClose={closeModal} neighborList={neighborList} />
			)}
		</div>
	);
}
