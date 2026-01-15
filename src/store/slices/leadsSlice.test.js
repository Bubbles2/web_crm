import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer, { addLead, fetchLeads } from './leadsSlice';
import api from '../../services/api';

// Mock the API module
vi.mock('../../services/api', () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

describe('leadsSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                leads: leadsReducer,
            },
        });
        vi.clearAllMocks();
    });

    describe('fetchLeads', () => {
        it('should fetch leads with correct fields', async () => {
            const mockLeads = [
                { lead_id: 1, name: 'Lead One', email: 'one@test.com', phone: '1234567890', status: 'New', source: 'Web' },
                { lead_id: 2, name: 'Lead Two', email: 'two@test.com', phone: '0987654321', status: 'Contacted', source: 'Referral' },
            ];

            api.get.mockResolvedValueOnce({ data: mockLeads });

            await store.dispatch(fetchLeads());

            const state = store.getState().leads;
            expect(state.status).toBe('succeeded');
            expect(state.items).toHaveLength(2);
            expect(state.items[0]).toEqual(expect.objectContaining({
                lead_id: 1,
                name: 'Lead One',
                email: 'one@test.com',
                phone: '1234567890',
                status: 'New',
                source: 'Web',
            }));
        });
    });

    describe('addLead', () => {
        it('should handle successful lead creation with all fields', async () => {
            const newLead = {
                name: 'Test Lead',
                email: 'test@example.com',
                phone: '555-5555',
                status: 'New',
                source: 'Test',
            };
            const responseData = { lead_id: 1, ...newLead }; // Backend returns lead_id

            // Mock the API response
            api.post.mockResolvedValueOnce({ data: responseData });

            // Dispatch the thunk
            await store.dispatch(addLead(newLead));

            // Verify the state
            const state = store.getState().leads;
            expect(state.items).toContainEqual(responseData);

            // Verify API was called correctly
            expect(api.post).toHaveBeenCalledWith('/leads', newLead);
        });

        it('should handle failed lead creation', async () => {
            const newLead = { name: 'Fail Lead' };
            const errorMessage = 'Network Error';

            // Mock the API failure
            api.post.mockRejectedValueOnce(new Error(errorMessage));

            // Dispatch the thunk
            await store.dispatch(addLead(newLead));

            // Verify the state
            const state = store.getState().leads;
            expect(state.items).toHaveLength(0);
        });
    });
});
