import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

const addData = async (text, replyingToRef = null, replyingToUser = null) => {
	await addDoc(collection(FirebaseDB, `/allComments/comments/rootComments`), {
		content: text,
		createdAt: Timestamp.fromDate(new Date()),
		// id: Math.random().toString(36).substring(2, 11),
		// id: docRef,
		replyingToRef,
		replyingToUser,
		score: 0,
		user: {
			image: 'image-juliusomo.png',
			username: 'juliusomo',
		},
		replies: [],
	});
};
export default addData;
