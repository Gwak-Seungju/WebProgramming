import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
	const [form, setForm] = useState({ email: '', password: '' });
	const [message, setMessage] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.post('http://localhost/term/login.php', form, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = res.data;
			if (data.success) {
				setMessage(`환영합니다, ${data.username}님!`);
			} else {
				setMessage(data.message || '로그인 실패');
			}
		} catch (err) {
			console.error(err);
			setMessage('서버 오류 또는 연결 실패');
		}
	};

	return (
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
			{message && <p>{message}</p>}
		</form>
	);
}
