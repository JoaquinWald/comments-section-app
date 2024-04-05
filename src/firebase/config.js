// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC_irf3Ye8FdwGhHnY2zqyOxrWX9Hg2-Es',
	authDomain: 'interactive-comments-section-1.firebaseapp.com',
	projectId: 'interactive-comments-section-1',
	storageBucket: 'interactive-comments-section-1.appspot.com',
	messagingSenderId: '1097080074432',
	appId: '1:1097080074432:web:2a411b0224125d7b077d25',
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseDB = getFirestore(FirebaseApp);
// export const FirebaseStorage = getStorage(FirebaseApp);
