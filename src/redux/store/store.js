import { configureStore } from '@reduxjs/toolkit';
import { interactionCommentsSlice } from './interactionComments/interactionCommentsSlice';

export const store = configureStore({
	reducer: {
		interactionComments: interactionCommentsSlice.reducer,
	},
});
