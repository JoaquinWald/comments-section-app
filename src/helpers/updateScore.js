import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

export const updateScore = async (data) => {
	// console.log('data', data.commentId);
	// console.log('data', data.type);

	const rootCommentRef = doc(FirebaseDB, `/allComments/comments/rootComments/${data.commentId}`);
	const replyRef = doc(FirebaseDB, `/allComments/comments/replies/${data.commentId}`);

	const rootCommentDoc = await getDoc(rootCommentRef);
	const replyDoc = await getDoc(replyRef);

	if (rootCommentDoc.exists()) {
		if (data.type === 'plus') {
			await updateDoc(rootCommentRef, {
				score: increment(1),
			});
		}
		if (data.type === 'minus') {
			await updateDoc(rootCommentRef, {
				score: increment(-1),
			});
		}
	} else if (replyDoc.exists()) {
		if (data.type === 'plus') {
			await updateDoc(replyRef, {
				score: increment(1),
			});
		}
		if (data.type === 'minus') {
			await updateDoc(replyRef, {
				score: increment(-1),
			});
		}
	} else {
		throw new Error('score no encontrado');
	}
};
