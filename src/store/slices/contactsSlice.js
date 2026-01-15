import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    items: [
        { id: '1', name: 'Alice Smith', email: 'alice@example.com', phone: '123-456-7890', role: 'CEO', company: 'Wonderland Inc.', linkedLeadId: null },
        { id: '2', name: 'Bob Jones', email: 'bob@example.com', phone: '098-765-4321', role: 'CTO', company: 'Builder Corp.', linkedLeadId: 'lead-1' }
    ],
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.items.push({ ...action.payload, id: uuidv4() });
        },
        updateContact: (state, action) => {
            const index = state.items.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteContact: (state, action) => {
            state.items = state.items.filter(contact => contact.id !== action.payload);
        },
    },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
