import { useState } from 'react';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useEditProfile } from '../hooks/useEditProfile';
import { useUserActivity } from '../hooks/useUserActivity';
import styles from './MyPage.module.scss';
import useUserInfo from '@/hooks/useUserInfo';

export default function MyPage() {
	const { data: userInfo } = useUserInfo();
	const userId = userInfo!.user_id;
	const { data: userActivity } = useUserActivity(userId);
	const { mutate: editProfile } = useEditProfile();
	const { mutate: deleteUser } = useDeleteUser();

	const [username, setUsername] = useState(userInfo?.username);

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleEditProfile = () => {
		editProfile({ user_id: userId, username: username! });
	};

	const handleDeleteUser = () => {
		deleteUser(userId);
	};

	return (
		<div className={styles.container}>
			<div>
				<h2>프로필 수정</h2>
				<div>
					<div>이름</div>
					<input type="text" value={username} onChange={handleUsernameChange} />
					<button onClick={handleEditProfile}>수정하기</button>
				</div>
			</div>
			<div>
				<h2>내 활동</h2>
				<div>
					<div>내 글수</div>
					<div>{userActivity!.post_count}개</div>
				</div>
				<div>
					<div>내 이웃 목록</div>
					<div>{userActivity!.friend_count}명</div>
				</div>
				<button>내 블로그로 이동</button>
			</div>
			<button onClick={handleDeleteUser}>회원 탈퇴</button>
		</div>
	);
}
