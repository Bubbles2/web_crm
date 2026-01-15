import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    items: [
        { id: 'lead-1', name: 'Charlie Day', status: 'New', source: 'Web', email: 'charlie@paddys.com' },
        { id: 'lead-2', name: 'Dennis Reynolds', status: 'In Progress', source: 'Referral', email: 'dennis@paddys.com' }
    ],
};

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        addLead: (state, action) => {
            state.items.push({ ...action.payload, id: uuidv4(), status: 'New' });
        },
        updateLead: (state, action) => {
            const index = state.items.findIndex(lead => lead.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteLead: (state, action) => {
            state.items = state.items.filter(lead => lead.id !== action.payload);
        },
        // When a lead is converted, we might want to change its status or keep it for history
        convertLeadStatus: (state, action) => {
            const index = state.items.findIndex(lead => lead.id === action.payload.id);
            if (index !== -1) {
                state.items[index].status = 'Converted';
            }
        }
    },
});

export const { addLead, updateLead, deleteLead, convertLeadStatus } = leadsSlice.actions;
export default leadsSlice.reducer;
