import deleteData from '../helpers/deleteData';

/* eslint-disable react/prop-types */
export const Modal = ({ isOpen, idDocu, onClose }) => {
	const onDelete = () => {
		deleteData(idDocu);

		onClose();
	};

	return (
		<div className='modal'>
			{isOpen && (
				<div className='modal-content'>
					<h2 className='modal__title'>Delete comment</h2>
					<p className='modal__p'>Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.</p>
					<div className='modal__buttons-container'>
						<button className='modal__button--cancel' onClick={onClose}>
							NO, CANCEL
						</button>
						<button className='modal__button--delete' onClick={() => onDelete()}>
							YES, DELETE
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
