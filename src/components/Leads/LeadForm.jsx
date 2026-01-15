import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLead, updateLead } from '../../store/slices/leadsSlice';
import { X } from 'lucide-react';

const LeadForm = ({ onClose, initialData }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        source: '',
        status: 'New'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initialData) {
                // Handle both id (from local) and lead_id (from DB)
                const id = initialData.lead_id || initialData.id;
                await dispatch(updateLead({ ...formData, lead_id: id })).unwrap();
            } else {
                await dispatch(addLead(formData)).unwrap();
            }
            onClose();
        } catch (err) {
            console.error('Failed to save lead:', err);
            alert('Failed to save lead');
        }
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
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>{initialData ? 'Edit Lead' : 'New Lead'}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Name</label>
                        <input
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Email</label>
                        <input
                            type="email"
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Source</label>
                        <select
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} required
                        >
                            <option value="">Select Source</option>
                            <option value="Web">Web</option>
                            <option value="Referral">Referral</option>
                            <option value="Event">Event</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Status</label>
                        <select
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="New">New</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
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

export default LeadForm;
