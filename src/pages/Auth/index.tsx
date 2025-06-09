import { Outlet } from 'react-router-dom';
import styles from './Auth.module.scss';

export default function Auth() {
	return (
		<div className={styles.container}>
			<h1>G Blog</h1>
			<Outlet />
		</div>
	);
}
