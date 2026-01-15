import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLead, convertLeadStatus } from '../../store/slices/leadsSlice';
import { addContact } from '../../store/slices/contactsSlice';
import { Pencil, Trash2, Mail, UserPlus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeadList = ({ onEdit, viewMode = 'card' }) => {
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


    if (viewMode === 'list') {
        return (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>
                        <tr>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Name</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Email</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Source</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map(lead => (
                            <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-border)', opacity: lead.status === 'Converted' ? 0.7 : 1 }}>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-primary-dark)', fontWeight: 500 }}>{lead.name}</td>
                                <td style={{ padding: 'var(--spacing-md)' }}>
                                    <span style={{
                                        fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px',
                                        backgroundColor: getStatusColor(lead.status), color: lead.status === 'In Progress' ? 'black' : 'white'
                                    }}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>{lead.email}</td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>{lead.source}</td>
                                <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
                                        <button onClick={() => onEdit(lead)} style={{ color: 'var(--color-text-muted)', border: 'none', background: 'none', cursor: 'pointer' }} title="Edit">
                                            <Pencil size={18} />
                                        </button>
                                        {lead.status !== 'Converted' && (
                                            <button onClick={() => handleConvert(lead)} style={{ color: 'var(--color-accent)', border: 'none', background: 'none', cursor: 'pointer' }} title="Convert">
                                                <UserPlus size={18} />
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(lead.id)} style={{ color: 'var(--color-danger)', border: 'none', background: 'none', cursor: 'pointer' }} title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

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
