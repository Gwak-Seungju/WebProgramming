// hooks/useEditProfile.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

interface EditProfileParams {
	user_id: number;
	username: string;
}

export const useEditProfile = () => {
	return useMutation({
		mutationFn: async ({ user_id, username }: EditProfileParams) => {
			const { data } = await axios.post(
				'http://localhost/term/edit_profile.php',
				{
					user_id,
					username,
				},
			);
			return data;
		},
		onSuccess: (data) => {
			if (data.success) {
				toast.success('프로필이 수정되었습니다.');
			} else {
				toast.error('프로필 수정 실패: ' + data.error);
			}
		},
		onError: () => {
			toast.error('서버 오류가 발생했습니다.');
		},
	});
};
