import { Comments } from './components/Comments';
import { useEffect, useState } from 'react';
import { loadComments } from './helpers/loadComments';

function App() {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		loadComments()
			.then((response) => setComments(response))

			.catch((err) => console.error(err));
	}, []);

	return (
		<main>
			{comments.map(({ username, content, createdAt, id, score }) => (
				<Comments key={id} username={username} content={content} createdAt={createdAt} id={id} score={score} />
			))}
		</main>
	);
}

export default App;
