import { deleteDoc, doc } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

const deleteData = async (idDoc) => {
	const docRef = doc(FirebaseDB, `/allComments/comments/rootComments/${idDoc}`);
	const replyRef = doc(FirebaseDB, `/allComments/comments/replies/${idDoc}`);
	await deleteDoc(docRef);
	await deleteDoc(replyRef);

	// const replyRef = doc(FirebaseDB, 'LTXrAByQMAZQzkImTvsZ');
	// try {
	// 	await updateDoc(replyRef, {
	// 		replies: arrayRemove(0),
	// 	});
	// 	console.log(`Respuesta en la posición ${0} eliminada`);
	// } catch (error) {
	// 	console.error('Error al eliminar la respuesta:', error);
	// }
	// await updateDoc(replyRef, {
	// 	[0]: deleteField(),
	// });
};
export default deleteData;
