import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useEditProfile } from '../hooks/useEditProfile';
import { useUserActivity } from '../hooks/useUserActivity';
import styles from './MyPage.module.scss';
import useUserInfo from '@/hooks/useUserInfo';

export default function MyPage() {
	const navigate = useNavigate();
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

	const goMyBlog = () => {
		navigate(`/blog/${userInfo?.username}/${userInfo?.user_id}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<div className={styles.profile__title}>프로필 수정</div>
				<div className={styles.profile__name}>
					<div className={styles['profile__name--text']}>별명</div>
					<input
						type="text"
						value={username}
						className={styles['profile__name--input']}
						onChange={handleUsernameChange}
					/>
					<button
						className={styles['profile__name--edit']}
						onClick={handleEditProfile}
					>
						수정
					</button>
				</div>
				<button className={styles.profile__button} onClick={handleDeleteUser}>
					회원 탈퇴
				</button>
			</div>
			<div className={styles.activity}>
				<div className={styles.activity__title}>내 활동</div>
				<div className={styles.activity__post}>
					<div>내 글수</div>
					<div>
						<span>{userActivity!.post_count}</span>개
					</div>
				</div>
				<div className={styles.activity__neighbor}>
					<div>내 이웃 목록</div>
					<div>
						<span>{userActivity!.friend_count}</span>명
					</div>
				</div>
				<button className={styles.activity__button} onClick={goMyBlog}>
					내 블로그로 이동
				</button>
			</div>
		</div>
	);
}
