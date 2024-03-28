export const startNewComment = () => {
	return async (dispatch, getState) => {
		console.log('startNewComment');
		console.log(getState());

		const newComment = {
			username: '',
			createdAt: new Date().getTime(),
			content: '',
			score: null,
		};
		newComment.id = '';
	};
};
