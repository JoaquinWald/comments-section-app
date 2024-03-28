import { createSlice } from '@reduxjs/toolkit';

export const interactionCommentsSlice = createSlice({
	name: 'interactionComments',

	initialState: {
		isSaving: true,
		messageSaved: '',
		notes: [],
		active: null,
	},

	reducers: {
		addNewEmptyComment: (state, action) => {},
		setActiveComment: (state, action) => {},
		setComments: (state, action) => {},
		setSaving: (state) => {},
		updateComment: (state, action) => {},
		deleteComment: (state, action) => {},
	},
});

// Action creators are generated for each case reducer function
export const { addNewEmptyComment, setActiveComment, setComments, setSaving, updateComment, deleteComment } = interactionCommentsSlice.actions;
