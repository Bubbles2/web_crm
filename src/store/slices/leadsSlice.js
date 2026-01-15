import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunks
export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
    const response = await api.get('/leads');
    return response.data;
});

export const addLead = createAsyncThunk('leads/addLead', async (leadData) => {
    const response = await api.post('/leads', leadData);
    return response.data;
});

export const updateLead = createAsyncThunk('leads/updateLead', async (leadData) => {
    const { id, ...data } = leadData;
    // Backend expects 'lead_id' but frontend usually handles 'id'. 
    // If the object has 'lead_id' uses that, else assumes 'id' is the DB id.
    const leadId = id || leadData.lead_id;
    await api.put(`/leads/${leadId}`, data);
    return leadData; // Return the data to update the state immediately or re-fetch
});

export const deleteLead = createAsyncThunk('leads/deleteLead', async (id) => {
    await api.delete(`/leads/${id}`);
    return id;
});

export const convertLeadStatus = createAsyncThunk('leads/convertLeadStatus', async ({ id }) => {
    // Ideally backend should handle this, for now we just update status
    await api.put(`/leads/${id}`, { status: 'Converted' });
    return id;
});


const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchLeads.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add
            .addCase(addLead.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateLead.fulfilled, (state, action) => {
                const index = state.items.findIndex(lead => (lead.lead_id === action.payload.id) || (lead.lead_id === action.payload.lead_id));
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...action.payload };
                }
            })
            // Delete
            .addCase(deleteLead.fulfilled, (state, action) => {
                state.items = state.items.filter(lead => lead.lead_id !== action.payload);
            })
            // Convert
            .addCase(convertLeadStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(lead => lead.lead_id === action.payload);
                if (index !== -1) {
                    state.items[index].status = 'Converted';
                }
            });
    },
});

export default leadsSlice.reducer;
