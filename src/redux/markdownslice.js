import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';







export const markdownSlice = createSlice({
    name: 'markdown',
    initialState,
    reducers: {
        update: (state, action) => {
        state.text = action.payload;
        },
    },
    });
    
    export const { update } = markdownSlice.actions;
    
    
    export default markdownSlice.reducer;