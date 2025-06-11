import { Outlet, useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss';

export default function Auth() {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<button className={styles.logo} onClick={() => navigate('/')}>
				G Blog
			</button>
			<Outlet />
		</div>
	);
}
