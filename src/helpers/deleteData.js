import { deleteDoc, doc } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

const deleteData = async (idDoc) => {
	const docRef = doc(FirebaseDB, `/comments/${idDoc}`);
	// const idDoc = docRef.path;
	// console.log('docRef', docRef);
	await deleteDoc(docRef);
};
export default deleteData;
