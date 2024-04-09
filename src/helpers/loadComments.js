import { collection, onSnapshot } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { FirebaseDB } from '../firebase/config';

// export const loadComments = async () => {
// 	const collectionRef = collection(FirebaseDB, '/comments');
// 	const docs = await getDocs(collectionRef);

// 	const comments = [];
// 	docs.forEach((doc) => {
// 		comments.push({ ...doc.data() });
// 	});

// 	return comments;
// };

export const loadComments = async () => {
	const commentsCollectionRef = collection(FirebaseDB, '/comments');

	const comments = [];
	onSnapshot(commentsCollectionRef, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
			console.log('snapshot', snapshot.docChanges());
			if (change.type === 'added') {
				comments.push({ ...change.doc.data(), idDocumment: { ...change.doc.id.split(' ') } });
			}
			if (change.type === 'modified') {
				// console.log('Modified city: ', change.doc.data());
			}
			if (change.type === 'removed') {
				// comments.push({ ...change.doc.data() });
				console.log('REOMVED:', { ...change.doc.data() });
			}
		});
	});
	// unsubscribe();
	return comments;
};
