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
		<section className='form-container'>
			<form className='form-main' onSubmit={onSubmit}>
				<textarea className='form-input' value={text} onChange={(e) => setText(e.target.value)} placeholder='Add a comment...'></textarea>

				<div
					className={`${
						submitLabel === 'SEND'
							? 'form-img-buttons-container'
							: submitLabel === 'Update'
							? 'form-img-buttons-update-cancel'
							: submitLabel === 'Reply'
							? 'form-img-buttons-reply'
							: ''
					}`}
				>
					<picture className='form-img-container'>
						<img className='form-img' src={img} alt='' />
					</picture>

					<button
						className={`${submitLabel === 'SEND' ? 'form-button-send' : 'form-button-update'}`}
						// className='form-button-submit-label'
						disabled={isInputDisabled}
					>
						{submitLabel}
					</button>

					{hasCancelButton && (
						<button className='form-button-cancel' type='button' onClick={handleCancel}>
							Cancel
						</button>
					)}
				</div>
			</form>
		</section>
	);
};
export default CommentForm;
