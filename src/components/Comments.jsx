/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';

import { useEffect, useState } from 'react';
// import { loadComments } from '../helpers/loadComments';
import Comment from './Comment';
import { loadImages } from '../helpers/loadImages';
import CommentForm from './CommentForm';
import addData from '../helpers/addData';
import deleteData from '../helpers/deleteData';
import { collection, onSnapshot } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

export const Comments = ({ currentUser }) => {
	const [backendComments, setBackendComments] = useState([]);
	console.log('backendComments', backendComments);

	const [images, setimages] = useState([]);

	const addComment = (text, replyingTo) => {
		addData(text, replyingTo);
	};

	const handleDelete = (idDocu) => {
		if (window.confirm('Sure?')) {
			deleteData(idDocu);
		}
	};

	//Con esto escuchamos todo el tiempo los cambios en la DB y actualizamos BackendComments de acuerdo a la acción realizada
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(FirebaseDB, 'comments'), (snapshot) => {
			const newComments = [];
			snapshot.forEach((doc) => {
				newComments.push({ id: doc.id, ...doc.data() });
				// console.log('newComments', doc.id);
			});
			setBackendComments(newComments);
		});

		// Devuelve una función de limpieza para detener la escucha de cambios cuando el componente se desmonta
		return () => unsubscribe();
	}, []);

	// useEffect(() => {
	// 	loadComments()
	// 		.then((response) => {
	// 			setBackendComments(response);
	// 			console.log('responseeeee', response);
	// 		})

	// 		.catch((err) => console.error(err));
	// }, []);

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
			{backendComments.map((backendComment) => (
				<Comment key={uuidv4()} comments={backendComment} images={images} currentUser={currentUser} handleDelete={handleDelete} />
			))}

			<CommentForm submitLabel='SEND' handleSubmit={addComment} currentUser={currentUser} images={images} />
		</section>
	);
};
