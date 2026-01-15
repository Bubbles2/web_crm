import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from '../../store/slices/contactsSlice';
import { X } from 'lucide-react';

const ContactForm = ({ onClose, initialData }) => {
    const dispatch = useDispatch();
    const leads = useSelector(state => state.leads.items);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        company: '',
        linkedLeadId: ''
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
                // Handle local id and DB contact_id
                const id = initialData.contact_id || initialData.id;
                await dispatch(updateContact({ ...formData, contact_id: id })).unwrap();
            } else {
                await dispatch(addContact(formData)).unwrap();
            }
            onClose();
        } catch (err) {
            console.error("Failed to save contact:", err);
            alert("Failed to save contact");
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
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>{initialData ? 'Edit Contact' : 'New Contact'}</h2>

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
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Phone</label>
                            <input
                                style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Role</label>
                            <input
                                style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Company</label>
                        <input
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)' }}>Link to Lead (Optional)</label>
                        <select
                            style={{ width: '100%', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            value={formData.linkedLeadId || ''}
                            onChange={e => setFormData({ ...formData, linkedLeadId: e.target.value })}
                        >
                            <option value="">None</option>
                            {leads.map(lead => (
                                <option key={lead.lead_id} value={lead.lead_id}>{lead.name} ({lead.company || 'Unknown'})</option>
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

export default ContactForm;
