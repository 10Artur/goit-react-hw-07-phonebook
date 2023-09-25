import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: [],
    filter: '',
};

const slice = createSlice({
    name: 'contact',
    initialState: initialState,
    reducers: {
        addContact(state, action) {
            state.contacts.push(action.payload);
        },
        deleteContact(state, action) {
            state.contacts = state.contacts.filter(
                contact => contact.id !== action.payload
            );
        },
        updateFilter(state, action) {
            state.filter = action.payload;
        },
    },
});

export const { addContact, deleteContact, updateFilter } = slice.actions;

export const contactReducer = slice.reducer;