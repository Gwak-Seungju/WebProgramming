import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import styles from './LoginPage.module.scss';
import BlindIcon from '@/assets/blind.svg';
import EyeIcon from '@/assets/eye.svg';

export default function LoginPage() {
	const navigate = useNavigate();
	const { mutate: login } = useLogin();
	const [form, setForm] = useState({ email: '', password: '' });
	const [showPw, setShowPw] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		login(form);
	};

	const toggleShowPw = () => {
		setShowPw((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			<form className={styles.container__form} onSubmit={handleSubmit}>
				<div className={styles['container__input--field-id']}>
					<input
						type="email"
						name="email"
						placeholder="이메일을 입력하세요"
						value={form.email}
						onChange={handleChange}
						required
						className={styles['container__input--text']}
					/>
				</div>
				<div className={styles['container__input--field-pw']}>
					<input
						type={showPw ? 'text' : 'password'}
						name="password"
						placeholder="비밀번호를 입력하세요"
						value={form.password}
						onChange={handleChange}
						required
						className={styles['container__input--text']}
					/>
					<button
						type="button"
						onClick={toggleShowPw}
						className={styles['container__input--icon']}
						tabIndex={-1}
					>
						{showPw ? <EyeIcon /> : <BlindIcon />}
					</button>
				</div>
				<button type="submit" className={styles.container__button}>
					로그인
				</button>
			</form>
			<button
				type="button"
				className={styles.container__signup}
				onClick={() => navigate('/auth/signup')}
			>
				<span>비회원이신가요?</span> 회원가입
			</button>
		</div>
	);
}
