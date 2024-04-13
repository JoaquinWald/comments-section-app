/* eslint-disable react/prop-types */
import { useState } from 'react';

const CommentForm = ({ submitLabel, handleSubmit, currentUser = [], images, initialText = '', hasCancelButton = false, handleCancel }) => {
	const [text, setText] = useState(initialText);
	const isInputDisabled = text?.length === 0;

	const img = images?.filter((i) => i.includes(currentUser));
	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(text);
		setText('');
	};

	return (
		<section>
			<form onSubmit={onSubmit}>
				<textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
				{/* <input type='text' value={text} onChange={(e) => setText(e.target.value)} /> */}

				<div>
					<picture>
						<img src={img} alt='' />
					</picture>
					<button disabled={isInputDisabled}>{submitLabel}</button>
					{hasCancelButton && (
						<button type='button' onClick={handleCancel}>
							Cancel
						</button>
					)}
				</div>
			</form>
		</section>
	);
};
export default CommentForm;
