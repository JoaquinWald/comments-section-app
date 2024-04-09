import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

const addData = async (text, replyingTo = null) => {
	await addDoc(collection(FirebaseDB, '/comments'), {
		content: text,
		createdAt: Timestamp.fromDate(new Date()),
		// id: Math.random().toString(36).substring(2, 11),
		// id: docRef,
		replyingTo,
		score: 0,
		user: {
			username: 'juliusomo',
		},
		replies: [],
	});
	// return docRef;

	//  // Obtener los datos del documento recién agregado
	//  const docSnap = await getDoc(doc(docRef));
	//  const docData = docSnap.data();

	//  // Retornar los datos del documento
	//  return docData;
};
export default addData;
