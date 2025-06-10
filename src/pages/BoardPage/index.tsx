import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function BoardPage() {
	return (
		<div className={styles.layout}>
			<Suspense>
				<Header />
			</Suspense>
			<div className={styles.content}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
