import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLead, convertLeadStatus } from '../../store/slices/leadsSlice';
import { addContact } from '../../store/slices/contactsSlice';
import { Pencil, Trash2, Mail, UserPlus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeadList = ({ onEdit }) => {
    const leads = useSelector(state => state.leads.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            dispatch(deleteLead(id));
        }
    };

    const handleConvert = (lead) => {
        if (window.confirm(`Convert ${lead.name} to Contact?`)) {
            // Create contact
            dispatch(addContact({
                name: lead.name,
                email: lead.email,
                phone: '', // Lead didn't have phone in state, would be nice to add
                role: 'Lead Converted',
                company: 'Unknown',
                linkedLeadId: lead.id
            }));
            // Update lead status
            dispatch(convertLeadStatus({ id: lead.id }));
            navigate('/contacts');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'var(--color-primary)';
            case 'In Progress': return 'var(--color-warning)';
            case 'Converted': return 'var(--color-accent)';
            case 'Lost': return 'var(--color-text-muted)';
            default: return 'var(--color-primary)';
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
            {leads.map(lead => (
                <div key={lead.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', opacity: lead.status === 'Converted' ? 0.7 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ color: 'var(--color-primary-dark)' }}>{lead.name}</h3>
                        <span style={{
                            fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px',
                            backgroundColor: getStatusColor(lead.status), color: lead.status === 'In Progress' ? 'black' : 'white'
                        }}>
                            {lead.status}
                        </span>
                    </div>

                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                        <Mail size={16} /> {lead.email}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Source: {lead.source}
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)' }}>
                        <button onClick={() => onEdit(lead)} style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Pencil size={16} /> Edit
                        </button>
                        {lead.status !== 'Converted' && (
                            <button onClick={() => handleConvert(lead)} style={{ color: 'var(--color-accent)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <UserPlus size={16} /> Convert
                            </button>
                        )}
                        <button onClick={() => handleDelete(lead.id)} style={{ color: 'var(--color-danger)' }}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeadList;
