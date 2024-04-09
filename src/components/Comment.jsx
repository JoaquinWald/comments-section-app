import { getTimeAgoFromSeconds } from '../helpers/getTimeAgoFromSeconds';
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable react/prop-types */
const Comment = ({ comments = [], images, currentUser, handleDelete }) => {
	const timeSec = comments?.createdAt?.seconds * 1000;
	const date = new Date(timeSec);
	const createdAt = getTimeAgoFromSeconds(date);
	// console.log('commentsaaaaaa', comments);

	const repliesObj = comments?.replies;
	console.log('repliesObj', repliesObj);

	const canReply = Boolean(currentUser) && currentUser !== comments?.user?.username;
	const canEdit = currentUser === comments?.user?.username;
	const canDelete = currentUser === comments?.user?.username;

	const img = images?.filter((img) => img.includes(comments.user?.username));

	//viene de type 'document' si es la referencia en vez del comentario en sí, desde firestore.
	return comments.type === 'document' ? (
		''
	) : (
		<article className='comments-structure'>
			<div className='comments-structure__header'>
				<figure>
					<img src={img} alt='' className='comments-structure__header--img' />
				</figure>

				<h3 className='comments-structure__header--h3'>{comments?.user?.username}</h3>
				{canDelete && <span className='comments-structure__header--you'>you</span>}
				<span>{createdAt}</span>
			</div>

			<div className='comments-structure__paragraph'>
				<p className='comments-structure__paragraph-replyingto'>{comments?.replyingTo !== null && '@' + comments?.replyingTo}</p>
				<p className='comments-structure__paragraph-content'>{comments?.content}</p>
			</div>

			<div className='comments-structure__footer'>
				<div>+ {comments?.score} -</div>

				{canReply && <button>Reply</button>}
				{canDelete && <button onClick={() => handleDelete(comments?.id)}>Delete</button>}
				{canEdit && <button>Edit</button>}
			</div>

			<div className='comments-structure-replies'>
				{/* Si no le paso el currentUser acá como prop, NO se dibujan los buttons en las replies, solo en los comentarios root */}
				{repliesObj?.map((reply) => (
					<Comment key={uuidv4()} comments={reply} images={images} currentUser={currentUser} handleDelete={handleDelete} />
				))}
			</div>
		</article>
	);
};
export default Comment;
