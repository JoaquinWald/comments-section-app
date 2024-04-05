/* eslint-disable react/prop-types */
const Comment = ({ commentsWithReplies }) => {
	console.log('replies', commentsWithReplies);

	return (
		<article className='comments-structure'>
			<h1>Comment</h1>
			<div className='comments-structure__header'>
				<figure>{/* <img src={images} alt='' className='comments-structure__header--img' /> */}</figure>

				{/* <h3 className='comments-structure__header--h3'>{username}</h3> */}
				<span>{}1 month ago</span>
			</div>
			<div className='comments-structure__paragraph'>{/* <p>{content}</p> */}</div>
			<div className='comments-structure__footer'>
				{/* <div>{score}</div> */}
				<button>Reply</button>
			</div>
		</article>
	);
};
export default Comment;
