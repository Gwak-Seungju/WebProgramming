import { useState } from 'react';
import useSignup from '../hooks/useSignup';
import styles from './SignupPage.module.scss';
import BlindIcon from '@/assets/blind.svg';
import EyeIcon from '@/assets/eye.svg';

export default function SignupPage() {
	const { mutate: signup } = useSignup();
	const [form, setForm] = useState({
		username: '1',
		email: '1',
		password: '1',
	});
	const [showPw, setShowPw] = useState<boolean>(false);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		signup(form);
	};

	const toggleShowPw = () => {
		setShowPw((prev) => !prev);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.container}>
			<div className={styles.container__auth}>
				<div className={styles.container__input}>
					<input
						placeholder="별명을 입력하세요 (필수)"
						className={styles['container__input--field']}
						onChange={(e) => setForm({ ...form, username: e.target.value })}
						required
					/>
				</div>
				<div className={styles.container__input}>
					<input
						placeholder="이메일을 입력하세요 (필수)"
						className={styles['container__input--field']}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						required
					/>
				</div>
				<div className={styles.container__input}>
					<input
						placeholder="비밀번호를 입력해주세요 (필수)"
						type={showPw ? 'text' : 'password'}
						className={styles['container__input--field']}
						onChange={(e) => setForm({ ...form, password: e.target.value })}
						required
					/>
					<button
						type="button"
						className={styles['container--password-hide']}
						onClick={toggleShowPw}
						tabIndex={-1}
					>
						{showPw ? <BlindIcon /> : <EyeIcon />}
					</button>
				</div>
			</div>
			<button type="submit" className={styles['container--submit']}>
				회원가입
			</button>
		</form>
	);
}
