/* eslint-disable react/prop-types */

import { collection, onSnapshot } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';
import { useEffect, useState } from 'react';
import { loadImages } from '../helpers/loadImages';
import Comment from './Comment';
import CommentForm from './CommentForm';
import addData from '../helpers/addData';
import deleteData from '../helpers/deleteData';
import { v4 as uuidv4 } from 'uuid';
import { AddReply as AddReplyApi } from '../helpers/AddReply';
import { updateComment as updateCommentApi } from '../helpers/updateComment';
import { updateScore } from '../helpers/updateScore';

export const Comments = ({ currentUser }) => {
	const [rootComments, setRootComments] = useState([]);
	const sortedRootComments = [...rootComments].sort((a, b) => b.score - a.score);

	const [repliesComments, setRepliesComments] = useState([]);
	const sortedReplies = repliesComments.sort((a, b) => new Date(a.createdAt?.seconds).getTime() - new Date(b.createdAt?.seconds).getTime());
	// console.log(sortedReplies);

	const [activeComments, setActiveComments] = useState(null);

	const [replyingToUserName, setReplyingToUserName] = useState(null);

	const [images, setimages] = useState([]);

	const addReply = (text, replyingToRef, replyingToUser) => {
		AddReplyApi(text, replyingToRef, replyingToUser);
		setActiveComments(null);
	};

	const addComment = (text, replyingToRef, replyingToUser) => {
		addData(text, replyingToRef, replyingToUser);
		setActiveComments(null);
	};

	const handleDelete = (idDocu) => {
		if (window.confirm('Sure?')) {
			deleteData(idDocu);
		}
	};

	const updateComment = (text, commentID) => {
		updateCommentApi(text, commentID);
		setActiveComments(null);
	};

	const updateScoreValue = (data) => {
		updateScore(data);
	};

	//Con esto escuchamos todo el tiempo los cambios en la DB y actualizamos BackendComments de acuerdo a la acción realizada
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(FirebaseDB, 'allComments/comments/rootComments'), (snapshot) => {
			const newComments = [];
			snapshot.forEach((doc) => {
				newComments.push({ id: doc.id, ...doc.data() });
				// console.log('newComments', doc.id);
			});
			setRootComments(newComments);
		});

		// Devuelve una función de limpieza para detener la escucha de cambios cuando el componente se desmonta
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(FirebaseDB, 'allComments/comments/replies'), (snapshot) => {
			const newComments = [];
			snapshot.forEach((doc) => {
				newComments.push({ id: doc.id, ...doc.data() });
				// console.log('newComments', doc.id);
			});
			setRepliesComments(newComments);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		loadImages()
			.then((res) => {
				const imageUrls = res.map((item) => item.url);

				setimages(imageUrls);
			})

			.catch((err) => console.error(err));
	}, []);

	return (
		<section className='comments-container'>
			{sortedRootComments.map((rootComment) => (
				<Comment
					key={uuidv4()}
					comments={rootComment}
					images={images}
					currentUser={currentUser}
					handleDelete={handleDelete}
					replies={sortedReplies}
					activeComments={activeComments}
					setActiveComments={setActiveComments}
					addReply={addReply}
					replyingToUserName={replyingToUserName}
					setReplyingToUserName={setReplyingToUserName}
					updateComment={updateComment}
					updateScoreValue={updateScoreValue}
				/>
			))}
			{/* <div className='line-replies'></div> */}
			<CommentForm submitLabel='SEND' handleSubmit={addComment} currentUser={currentUser} images={images} />
		</section>
	);
};
