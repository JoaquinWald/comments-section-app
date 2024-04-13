import { getTimeAgoFromSeconds } from '../helpers/getTimeAgoFromSeconds';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from './CommentForm';
import imgReply from '../../images/icon-reply.svg';
import imgDelete from '../../images/icon-delete.svg';
import imgEdit from '../../images/icon-edit.svg';
import imgPlus from '../../images/icon-plus.svg';
import imgMinus from '../../images/icon-minus.svg';

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

	//viene de type 'document' si es la referencia en vez del comentario en sí, desde firestore.
	return comments?.type === 'document' ? (
		''
	) : (
		<article className='comments-structure'>
			<div className='comments-structure__header'>
				<figure>
					<img src={img} alt='' className='comments-structure__header--img' />
				</figure>

				<h3 className='comments-structure__header--h3'>{comments?.user?.username}</h3>
				{isYou && <span className='comments-structure__header--you'>you</span>}
				<span>{createdAt}</span>
			</div>

			<div className='comments-structure__paragraph'>
				<p className='comments-structure__paragraph-replyingto'>{comments?.replyingToRef && '@' + comments?.replyingToUser}</p>
				<p className='comments-structure__paragraph-content'>{comments?.content}</p>
			</div>

			<div className='comments-structure__footer'>
				<div>
					<button onClick={() => updateScoreValue({ commentId: comments?.id, type: 'plus' })}>
						<img src={imgPlus} />
					</button>{' '}
					{comments?.score}
					<button onClick={() => updateScoreValue({ commentId: comments?.id, type: 'minus' })}>
						<img src={imgMinus} />
					</button>
				</div>

				{/* <button onClick={() => setActiveComments({ id: comments?.id, type: 'replying', toUser: comments?.user?.username })}>Reply</button> */}
				{canReply && (
					<button onClick={() => handleSetTypeAndUsername()}>
						<img src={imgReply} />
						Reply
					</button>
				)}
				{canDelete && (
					<button disabled={comments?.canDelete === false} onClick={() => handleDelete(comments?.id)}>
						<img src={imgDelete} />
						Delete
					</button>
				)}
				{canEdit && (
					<button
						disabled={comments?.canDelete === false}
						onClick={() => setActiveComments({ id: comments.id, type: 'editing', toUser: comments?.user?.username })}
					>
						<img src={imgEdit} />
						Edit
					</button>
				)}
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

			{/* {isEditing && <CommentForm />} */}

			<div className='comments-structure-replies'>
				{rep?.map((reply) => (
					<Comment
						key={uuidv4()}
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
				))}
				{/* Si no le paso el currentUser acá como prop, NO se dibujan los buttons en las replies, solo en los comentarios root */}

				{/* {repliesObj?.map((reply) => (
					<Comment key={uuidv4()} comments={reply} images={images} currentUser={currentUser} handleDelete={handleDelete} />
				))} */}
			</div>
		</article>
	);
};
export default Comment;
