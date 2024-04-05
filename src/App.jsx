import { Comments } from './components/Comments';
import { currentUser } from '../data.json';

function App() {
	const currentUserName = currentUser.username;
	// console.log('currentUserNameeee:', currentUserName);

	return (
		<main>
			<h1>Hello Comments!</h1>
			<Comments currentUser={currentUserName} />
		</main>
	);
}

export default App;
