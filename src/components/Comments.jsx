/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { loadComments } from '../helpers/loadComments';
import Comment from './Comment';
// import { loadImages } from '../helpers/loadImages';

export const Comments = ({ currentUser }) => {
	const [backendComments, setBackendComments] = useState([]);
	console.log('commentsss', backendComments);
	// const [images, setimages] = useState([]);

	const commentsWithReplies = backendComments.filter((comment) => comment.replies.length > 0);
	console.log('commentsWithReplies', commentsWithReplies);

	// const getReplies = (commentUsername) => {
	// 	return backendComments.filter;
	// };
	// console.log('rootCommentsss', rootComment);

	useEffect(() => {
		loadComments()
			.then((response) => setBackendComments(response))

			.catch((err) => console.error(err));
	}, []);

	// useEffect(() => {
	// 	loadImages()
	// 		.then((response) => {
	// 			const userImages = response.filter((item) => item.name.includes(username));

	// 			const imageUrls = userImages.map((item) => item.url);

	// 			setimages(imageUrls);
	// 		})

	// 		.catch((err) => console.error(err));
	// }, [username]);

	return (
		<section className='comments-container'>
			{backendComments.map((backendComment) => (
				<Comment key={backendComment.id} comment={backendComment} commentsWithReplies={commentsWithReplies} />
			))}
		</section>
	);
};
