import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunks
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const response = await api.get('/contacts');
    return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contactData) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
});

export const updateContact = createAsyncThunk('contacts/updateContact', async (contactData) => {
    const { id, ...data } = contactData;
    // Backend expects 'contact_id' but frontend usually handles 'id' or uses 'contact_id' if available.
    const contactId = id || contactData.contact_id;
    await api.put(`/contacts/${contactId}`, data);
    return contactData;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
    await api.delete(`/contacts/${id}`);
    return id;
});

const initialState = {
    items: [],
    status: 'idle',
    error: null
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.items.findIndex(contact => (contact.contact_id === action.payload.id) || (contact.contact_id === action.payload.contact_id));
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...action.payload };
                }
            })
            // Delete
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(contact => contact.contact_id !== action.payload);
            });
    },
});

export default contactsSlice.reducer;
