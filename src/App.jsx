import { Comments } from './components/Comments';
// import { currentUser } from '../data.json';
import getCurrentUser from './helpers/getCurrentUser';
import { useEffect, useState } from 'react';

function App() {
	const [currentUser, setCurrentUser] = useState();
	// console.log('currentUser', currentUser);

	useEffect(() => {
		getCurrentUser()
			.then((res) => setCurrentUser(res.map((user) => user.username).toString()))

			.catch((err) => console.error(err));
	}, []);

	return (
		<main className='main-container'>
			<Comments currentUser={currentUser} />
		</main>
	);
}

export default App;
