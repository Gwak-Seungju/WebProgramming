// hooks/useDeleteUser.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useDeleteUser = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (user_id: number) => {
			const { data } = await axios.post(
				'http://localhost/term/auth/delete_user.php',
				{
					user_id,
				},
			);
			return data;
		},
		onSuccess: (data) => {
			if (data.success) {
				toast.success('회원 탈퇴가 완료되었습니다.');
				localStorage.removeItem('user_id');
				navigate('/');
			} else {
				toast.error('회원 탈퇴 실패: ' + data.error);
			}
		},
		onError: () => {
			toast.error('서버 오류가 발생했습니다.');
		},
	});
};
