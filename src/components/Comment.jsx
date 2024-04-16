import { getTimeAgoFromSeconds } from '../helpers/getTimeAgoFromSeconds';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from './CommentForm';
import imgReply from '../../images/icon-reply.svg';
import imgDelete from '../../images/icon-delete.svg';
import imgEdit from '../../images/icon-edit.svg';
// import imgPlus from '../../images/icon-plus.svg';
// import imgMinus from '../../images/icon-minus.svg';

/* eslint-disable react/prop-types */
const Comment = ({
	comments = [],
	images,
	currentUser,
	handleDelete,
	replies = [],
	activeComments,
	setActiveComments,
	addReply,
	refId = null,
	replyingToUserName,
	setReplyingToUserName,
	updateComment,
	updateScoreValue,
}) => {
	const timeSec = comments?.createdAt?.seconds * 1000;
	const date = new Date(timeSec);
	const createdAt = getTimeAgoFromSeconds(date);

	// console.log('comments', comments);

	const rep = replies?.filter((rep) => rep?.replyingToRef?.id === comments?.id);
	const img = images?.filter((img) => img.includes(comments?.user?.username));
	// console.log('rep', rep);

	const canReply = Boolean(currentUser) && currentUser !== comments?.user?.username;
	const canEdit = currentUser === comments?.user?.username;
	const canDelete = currentUser === comments?.user?.username;
	const isYou = currentUser === comments?.user?.username;

	const isReplying = activeComments && activeComments?.type === 'replying' && activeComments?.id === comments?.id;
	const isEditing = activeComments && activeComments?.type === 'editing' && activeComments?.id === comments?.id;
	// const replyId = parentId ? parentId : comments.id;

	const replyingToRefID = refId ? refId : comments.id;

	const handleSetTypeAndUsername = () => {
		setActiveComments({ id: comments?.id, type: 'replying', toUser: comments?.user?.username });
		setReplyingToUserName(comments?.user?.username);
	};

	return (
		<>
			<article className='comments-structure'>
				<div className='comments-structure__header'>
					<figure>
						<img src={img} alt='' className='comments-structure__header--img' />
					</figure>

					<h3 className='comments-structure__header--username'>{comments?.user?.username}</h3>
					{isYou && <span className='comments-structure__header--you'>you</span>}
					<span className='comments-structure__header--createdAt'>{createdAt}</span>
				</div>

				<div className='comments-structure__paragraph'>
					{comments?.replyingToRef && <strong className='comments-structure__paragraph-replyingto'>{'@' + comments?.replyingToUser}</strong>}
					<strong className='comments-structure__paragraph-content'>{comments?.content}</strong>
				</div>

				<div className='comments-structure__footer'>
					<div className='comments-structure__footer--score'>
						{/* <span className='comments-structure__footer--score-icons' onClick={() => updateScoreValue({ commentId: comments?.id, type: 'plus' })}>
							<img src={imgPlus} />
						</span> */}
						<svg
							className='comments-structure__footer--score-icons-container'
							onClick={() => updateScoreValue({ commentId: comments?.id, type: 'plus' })}
							width='12'
							height='12'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								className='comments-structure__footer--score-icons'
								d='M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z'
								fill='#C5C6EF'
							/>
						</svg>

						<span className='comments-structure__footer--score-number'>{comments?.score}</span>

						<svg
							className='comments-structure__footer--score-icons-container'
							onClick={() => updateScoreValue({ commentId: comments?.id, type: 'minus' })}
							width='10'
							height='3'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								className='comments-structure__footer--score-icons'
								d='M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z'
								fill='#C5C6EF'
							/>
						</svg>
					</div>

					{canReply && (
						<span className='comments-structure__footer--reply' onClick={() => handleSetTypeAndUsername()}>
							<img src={imgReply} />
							Reply
						</span>
					)}

					{canDelete && canEdit && (
						<div>
							<button
								className={`${comments?.canDelete === false ? 'comments-structure__footer--delete-disabled' : 'comments-structure__footer--delete'}`}
								// className='comments-structure__footer--delete'
								disabled={comments?.canDelete === false}
								onClick={() => handleDelete(comments?.id)}
							>
								<img src={imgDelete} />
								Delete
							</button>

							<button
								className={`${comments?.canDelete === false ? 'comments-structure__footer--edit-disabled' : 'comments-structure__footer--edit'}`}
								// className='comments-structure__footer--edit'
								disabled={comments?.canDelete === false}
								onClick={() => setActiveComments({ id: comments.id, type: 'editing', toUser: comments?.user?.username })}
							>
								<img src={imgEdit} />
								Edit
							</button>
						</div>
					)}
					{/* {canEdit && (
							<span
								className='comments-structure__footer--edit'
								disabled={comments?.canDelete === false}
								onClick={() => setActiveComments({ id: comments.id, type: 'editing', toUser: comments?.user?.username })}
							>
								<img src={imgEdit} />
								Edit
							</span>
						)} */}
				</div>

				{isReplying && <CommentForm submitLabel='Reply' handleSubmit={(text) => addReply(text, replyingToRefID, replyingToUserName)} />}

				{isEditing && (
					<CommentForm
						submitLabel='Update'
						hasCancelButton
						initialText={comments?.content}
						handleSubmit={(text) => updateComment(text, comments?.id)}
						handleCancel={() => setActiveComments(null)}
					/>
				)}
			</article>

			{rep?.map((reply) => (
				<article key={uuidv4()} className='comments-structure-replies'>
					<div className='comments-structure-replies__inside'>
						<Comment
							// key={uuidv4()}
							comments={reply}
							images={images}
							currentUser={currentUser}
							handleDelete={handleDelete}
							setActiveComments={setActiveComments}
							activeComments={activeComments}
							refId={comments.id}
							addReply={addReply}
							replyingToUserName={replyingToUserName}
							setReplyingToUserName={setReplyingToUserName}
							updateComment={updateComment}
							updateScoreValue={updateScoreValue}
						/>
					</div>
				</article>
			))}
		</>
	);
};
export default Comment;
