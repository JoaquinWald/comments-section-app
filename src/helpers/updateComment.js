import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

export const updateComment = async (text, commentID) => {
	const rootCommentRef = doc(FirebaseDB, `/allComments/comments/rootComments/${commentID}`);
	const replyRef = doc(FirebaseDB, `/allComments/comments/replies/${commentID}`);

	const rootCommentDoc = await getDoc(rootCommentRef);
	const replyDoc = await getDoc(replyRef);

	if (rootCommentDoc.exists()) {
		await updateDoc(rootCommentRef, {
			content: text,
		});
	} else if (replyDoc.exists()) {
		await updateDoc(replyRef, {
			content: text,
		});
	} else {
		throw new Error(`The comment with ID ${commentID} was not found.`);
	}

	// await updateDoc(docRef, {
	// 	content: text,
	// });
	// await updateDoc(replyRef, {
	// 	content: text,
	// });
};
