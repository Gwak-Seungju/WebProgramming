import styles from './MyPage.module.scss';

export default function MyPage() {
	return (
		<div className={styles.container}>
			<div>
				<h2>프로필 수정</h2>
				<div>
					<div>이름</div>
					<input type="text" />
					<button>수정하기</button>
				</div>
			</div>
			<div>
				<h2>내 활동</h2>
				<div>
					<div>내 글수</div>
					<div>2개</div>
				</div>
				<div>
					<div>내 이웃 목록</div>
				</div>
				<button>내 블로그로 이동</button>
			</div>
		</div>
	);
}
