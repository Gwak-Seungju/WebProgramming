import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function BoardPage() {
	return (
		<>
			<Suspense>
				<Header />
			</Suspense>
			<Outlet />
			<Footer />
		</>
	);
}
