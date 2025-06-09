import { useState } from 'react';
import useSignup from '../hooks/useSignup';

export default function SignupPage() {
	const { mutate: signup } = useSignup();
	const [form, setForm] = useState({
		username: '1',
		email: '1',
		password: '1',
	});

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		signup(form);
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				placeholder="Username"
				onChange={(e) => setForm({ ...form, username: e.target.value })}
			/>
			<input
				placeholder="Email"
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			<input
				placeholder="Password"
				type="password"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			<button type="submit">회원가입</button>
		</form>
	);
}
