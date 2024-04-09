/* eslint-disable react/prop-types */
import { useState } from 'react';

const CommentForm = ({ submitLabel, handleSubmit, currentUser = [], images }) => {
	const [text, setText] = useState('a');
	const isInputDisabled = text.length === 0;

	const img = images?.filter((i) => i.includes(currentUser));
	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(text);
		setText('');
	};

	return (
		<section>
			<form onSubmit={onSubmit}>
				<input type='text' value={text} onChange={(e) => setText(e.target.value)} />

				<div>
					<picture>
						<img src={img} alt='' />
					</picture>
					<button disabled={isInputDisabled}>{submitLabel}</button>
				</div>
			</form>
		</section>
	);
};
export default CommentForm;
