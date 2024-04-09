import { collection, getDocs } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

const getCurrentUser = async () => {
	const currentUserN = await getDocs(collection(FirebaseDB, '/currentUser'));

	const userName = [];
	currentUserN.forEach((doc) => {
		//no poner el spread en ...doc.data() xq da error en este caso
		userName.push(doc.data());
	});
	return userName;
};
export default getCurrentUser;
