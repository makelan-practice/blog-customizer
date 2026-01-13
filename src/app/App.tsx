import { CSSProperties, useState } from 'react';

import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../constants/articleProps';
import styles from '../styles/index.module.scss';

const initialArticleState: ArticleStateType = defaultArticleState;

export const App = () => {
	const [appliedArticleState, setAppliedArticleState] =
		useState<ArticleStateType>(initialArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedArticleState.fontFamilyOption.value,
					'--font-size': appliedArticleState.fontSizeOption.value,
					'--font-color': appliedArticleState.fontColor.value,
					'--container-width': appliedArticleState.contentWidth.value,
					'--bg-color': appliedArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={{
					applied: appliedArticleState,
					initial: initialArticleState,
					apply: setAppliedArticleState,
				}}
			/>
			<Article />
		</main>
	);
};
