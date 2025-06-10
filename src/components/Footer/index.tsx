import styles from './Footer.module.scss';

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className={styles.container}>
			<div>COPYRIGHT &copy; {year} BY G BLOG</div>
		</footer>
	);
}
