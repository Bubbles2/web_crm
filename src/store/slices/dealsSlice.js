import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    items: [
        { id: 'deal-1', title: 'Office Supplies Bulk', amount: 5000, stage: 'Proposal', contactId: '1', leadId: null },
        { id: 'deal-2', title: 'Website Redesign', amount: 12000, stage: 'Negotiation', contactId: null, leadId: 'lead-2' }
    ],
};

const dealsSlice = createSlice({
    name: 'deals',
    initialState,
    reducers: {
        addDeal: (state, action) => {
            state.items.push({ ...action.payload, id: uuidv4() });
        },
        updateDeal: (state, action) => {
            const index = state.items.findIndex(deal => deal.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteDeal: (state, action) => {
            state.items = state.items.filter(deal => deal.id !== action.payload);
        },
    },
});

export const { addDeal, updateDeal, deleteDeal } = dealsSlice.actions;
export default dealsSlice.reducer;
