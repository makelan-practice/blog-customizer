import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import type { ArticleStateType } from 'src/constants/articleProps';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: {
		initial: ArticleStateType;
		applied: ArticleStateType;
		apply: (newState: ArticleStateType) => void;
	};
};

export const ArticleParamsForm = ({ articleState }: ArticleParamsFormProps) => {
	const { initial, applied, apply } = articleState;

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [draftState, setDraftState] = useState<ArticleStateType>(applied);

	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleMouseDown = (event: MouseEvent) => {
			const target = event.target;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setIsMenuOpen(false);
			}
		};

		globalThis.addEventListener('mousedown', handleMouseDown);
		return () => globalThis.removeEventListener('mousedown', handleMouseDown);
	}, [isMenuOpen]);

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		apply(draftState);
	};

	const handleReset = () => {
		setDraftState(initial);
		apply(initial);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((v) => !v)}
			/>

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						настройки статьи
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={draftState.fontFamilyOption}
						onChange={(option) =>
							setDraftState((state) => ({ ...state, fontFamilyOption: option }))
						}
					/>

					<Separator />

					<RadioGroup
						name='radio'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={draftState.fontSizeOption}
						onChange={(option) =>
							setDraftState((state) => ({ ...state, fontSizeOption: option }))
						}
					/>

					<Separator />

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={draftState.fontColor}
						onChange={(option) =>
							setDraftState((state) => ({ ...state, fontColor: option }))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={draftState.backgroundColor}
						onChange={(option) =>
							setDraftState((state) => ({ ...state, backgroundColor: option }))
						}
					/>

					<Separator />

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={draftState.contentWidth}
						onChange={(option) =>
							setDraftState((state) => ({ ...state, contentWidth: option }))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
