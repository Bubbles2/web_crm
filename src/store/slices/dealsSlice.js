import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunks
export const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
    const response = await api.get('/deals');
    return response.data;
});

export const addDeal = createAsyncThunk('deals/addDeal', async (dealData) => {
    const response = await api.post('/deals', dealData);
    return response.data;
});

export const updateDeal = createAsyncThunk('deals/updateDeal', async (dealData) => {
    const { id, ...data } = dealData;
    // Backend expects 'deal_id' but frontend usually handles 'id'.
    // If the object has 'deal_id' uses that, else assumes 'id' is the DB id.
    const dealId = id || dealData.deal_id;
    await api.put(`/deals/${dealId}`, data);
    return dealData;
});

export const deleteDeal = createAsyncThunk('deals/deleteDeal', async (id) => {
    await api.delete(`/deals/${id}`);
    return id;
});

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const dealsSlice = createSlice({
    name: 'deals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchDeals.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchDeals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add
            .addCase(addDeal.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateDeal.fulfilled, (state, action) => {
                const index = state.items.findIndex(deal => (deal.deal_id === action.payload.id) || (deal.deal_id === action.payload.deal_id));
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...action.payload };
                }
            })
            // Delete
            .addCase(deleteDeal.fulfilled, (state, action) => {
                state.items = state.items.filter(deal => deal.deal_id !== action.payload);
            });
    },
});

export default dealsSlice.reducer;
