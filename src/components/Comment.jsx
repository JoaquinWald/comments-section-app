import { getTimeAgoFromSeconds } from '../helpers/getTimeAgoFromSeconds';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from './CommentForm';

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
	// userID = null,
}) => {
	const timeSec = comments?.createdAt?.seconds * 1000;
	const date = new Date(timeSec);
	const createdAt = getTimeAgoFromSeconds(date);

	const rep = replies?.filter((rep) => rep?.replyingToRef?.id === comments?.id);
	const img = images?.filter((img) => img.includes(comments?.user?.username));
	// console.log('rep', rep);

	const canReply = Boolean(currentUser) && currentUser !== comments?.user?.username;
	const canEdit = currentUser === comments?.user?.username;
	const canDelete = currentUser === comments?.user?.username;
	const isYou = currentUser === comments?.user?.username;

	const isReplying = activeComments && activeComments?.type === 'replying' && activeComments?.id === comments?.id;
	// const isEditing = activeComments && activeComments?.type === 'editing' && activeComments?.id === comments?.id;
	// const replyId = parentId ? parentId : comments.id;

	const replyingToRefID = refId ? refId : comments.id;
	// const replyingToUserID = userID ? userID : comments?.user?.username;

	const handleSetTypeAndUsername = () => {
		setActiveComments({ id: comments?.id, type: 'replying', toUser: comments?.user?.username });
		setReplyingToUserName(comments?.user?.username);
	};

	// const [replyingToUserName, setReplyingToUserName] = useState(null);
	// console.log('replyingToUserName', replyingToUserName);

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
				<div>+ {comments?.score} -</div>

				{/* <button onClick={() => setActiveComments({ id: comments?.id, type: 'replying', toUser: comments?.user?.username })}>Reply</button> */}
				{canReply && <button onClick={() => handleSetTypeAndUsername()}>Reply</button>}
				{canDelete && <button onClick={() => handleDelete(comments?.id)}>Delete</button>}
				{canEdit && <button onClick={() => setActiveComments({ id: comments.id, type: 'editing' })}>Edit</button>}
			</div>

			{isReplying && <CommentForm submitLabel='Reply' handleSubmit={(text) => addReply(text, replyingToRefID, replyingToUserName)} />}

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
						// userID={comments?.user?.username}
						addReply={addReply}
						replyingToUserName={replyingToUserName}
						setReplyingToUserName={setReplyingToUserName}
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
