import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SignupForm {
	username: string;
	email: string;
	password: string;
}

export default function useSignup() {
	const navigate = useNavigate();

	const mutate = useMutation({
		mutationFn: async (form: SignupForm) => {
			const res = await axios.post('http://localhost/term/signup.php', {
				username: form.username,
				email: form.email,
				password: form.password,
			});
			return res.data;
		},
		onSuccess: () => {
			navigate('/auth');
			toast('회원가입에 성공했습니다.', { type: 'success' });
		},
		onError: (error) => {
			console.error(error);
			toast('회원가입 중 오류가 발생했습니다.', { type: 'error' });
		},
	});

	return mutate;
}
