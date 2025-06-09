import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function LoginPage() {
	const navigate = useNavigate();
	const { mutate: login } = useLogin();
	const [form, setForm] = useState({ email: '', password: '' });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		login(form);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					name="email"
					placeholder="이메일"
					value={form.email}
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="비밀번호"
					value={form.password}
					onChange={handleChange}
					required
				/>
				<button type="submit">로그인</button>
			</form>
			<button onClick={() => navigate('/auth/signup')}>회원가입</button>
		</div>
	);
}
