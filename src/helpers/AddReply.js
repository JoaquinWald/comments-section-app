import { collection, addDoc, Timestamp, doc } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

export const AddReply = async (text, replyingToRef = null, replyingToUser = null) => {
	const rootCommentRef = doc(FirebaseDB, `/allComments/comments/rootComments/${replyingToRef}`);

	await addDoc(collection(FirebaseDB, `/allComments/comments/replies`), {
		content: text,
		createdAt: Timestamp.fromDate(new Date()),
		// id: Math.random().toString(36).substring(2, 11),
		// id: docRef,
		replyingToRef: rootCommentRef,
		replyingToUser: replyingToUser,
		score: 0,
		user: {
			image: 'image-juliusomo.png',
			username: 'juliusomo',
		},
		replies: [],
	});
};
// export default AddReply;
