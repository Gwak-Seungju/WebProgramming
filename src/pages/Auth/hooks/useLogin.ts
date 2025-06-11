import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

interface LoginForm {
	email: string;
	password: string;
}

export default function useLogin() {
	const mutate = useMutation({
		mutationFn: async (form: LoginForm) => {
			const res = await axios.post(
				'http://localhost/term/auth/login.php',
				form,
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);
			return res.data;
		},
		onSuccess: (data) => {
			if (data.success) {
				localStorage.setItem('user_id', data.user_id);
				window.location.href = '/';
			} else {
				toast('로그인에 실패했습니다.', { type: 'error' });
			}
		},
		onError: (error) => {
			console.error(error);
			toast('서버 오류 또는 연결 실패', { type: 'error' });
		},
	});

	return mutate;
}
