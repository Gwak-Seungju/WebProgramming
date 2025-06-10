import { useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.scss';
import PersonIcon from '@/assets/person.svg';
import PostsList from '@/components/PostsList';
import { useSearch } from '@/hooks/useSearch';

export default function SearchPage() {
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get('keyword') || '';
	const filter = (searchParams.get('filter') as 'post' | 'neighbor') || 'post';

	const { data, isLoading } = useSearch(keyword, filter);

	if (isLoading) return <div>검색 중...</div>;
	if (!data?.success) return <div>검색 실패: {data?.error}</div>;

	const results = filter === 'neighbor' ? data.neighbors : data.posts;

	if (!results || results.length === 0) return <div>검색 결과가 없습니다.</div>;

	return (
		<div className={styles.container}>
			<div className={styles.result}>
				<span className={styles.result__keyword}>'{keyword}'</span>에 대한 검색
				결과입니다.
				<span className={styles.result__count}>{results.length}건</span>
			</div>
			<div className={styles.content}>
				{filter === 'neighbor' ? (
					results.map((item: any, index: number) => (
						<div key={index} className={styles.content__result}>
							<button className={styles.user}>
								<div className={styles.personIcon}>
									<PersonIcon />
								</div>
								<div className={styles.user__name}>{item.username}</div>
							</button>
						</div>
					))
				) : (
					<PostsList posts={data.posts ?? []} />
				)}
			</div>
		</div>
	);
}
