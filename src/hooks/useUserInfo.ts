import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface UserInfo {
	user_id: number;
	username: string;
	email: string;
}

const fetchUserInfo = async (): Promise<UserInfo> => {
	const userId = localStorage.getItem('user_id');
	if (!userId) throw new Error('로그인이 필요합니다.');

	const res = await axios(`http://localhost/term/user.php?user_id=${userId}`);
	const data = await res.data;

	if (!data.success) {
		throw new Error(data.error || '사용자 정보를 불러오지 못했습니다.');
	}

	return data;
};

export default function useUserInfo() {
	return useQuery({
		queryKey: ['userInfo'],

		queryFn: fetchUserInfo,

		staleTime: 1000 * 60 * 10, // 10 minutes
		gcTime: 1000 * 60 * 60, // 1 hour
		retry: 1,
	});
}
