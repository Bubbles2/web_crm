import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDeal, updateDeal } from '../../store/slices/dealsSlice';
import { X } from 'lucide-react';

const DealForm = ({ onClose, initialData }) => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const leads = useSelector(state => state.leads.items);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        stage: 'Proposal',
        contactId: '',
        leadId: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData, amount: Number(formData.amount) };
        if (initialData) {
            dispatch(updateDeal(payload));
        } else {
            dispatch(addDeal(payload));
        }
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '500px', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <X size={20} />
                </button>
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>{initialData ? 'Edit Deal' : 'New Deal'}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Title</label>
                        <input
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Amount ($)</label>
                            <input
                                type="number"
                                style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Stage</label>
                            <select
                                style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                value={formData.stage} onChange={e => setFormData({ ...formData, stage: e.target.value })}
                            >
                                <option value="Prospecting">Prospecting</option>
                                <option value="Proposal">Proposal</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="Closed Won">Closed Won</option>
                                <option value="Closed Lost">Closed Lost</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Associate with Contact (Optional)</label>
                        <select
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.contactId || ''}
                            onChange={e => setFormData({ ...formData, contactId: e.target.value, leadId: '' })} // Clear lead if contact selected (simplified logic)
                        >
                            <option value="">None</option>
                            {contacts.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Associate with Lead (Optional)</label>
                        <select
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.leadId || ''}
                            onChange={e => setFormData({ ...formData, leadId: e.target.value, contactId: '' })}
                            disabled={!!formData.contactId}
                        >
                            <option value="">None</option>
                            {leads.map(l => (
                                <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{initialData ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DealForm;
