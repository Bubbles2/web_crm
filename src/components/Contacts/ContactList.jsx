import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from '../../store/slices/contactsSlice';
import { Pencil, Trash2, Mail, Phone, Building } from 'lucide-react';

const ContactList = ({ onEdit, viewMode = 'card' }) => {
    const contacts = useSelector(state => state.contacts.items);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            dispatch(deleteContact(id));
        }
    };


    if (viewMode === 'list') {
        return (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>
                        <tr>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Name</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Role</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Company</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Email</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontWeight: 600 }}>Phone</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.contact_id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-primary-dark)', fontWeight: 500 }}>{contact.name}</td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>{contact.role}</td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>{contact.company}</td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>{contact.email}</td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)' }}>{contact.phone}</td>
                                <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
                                        <button onClick={() => onEdit(contact)} style={{ color: 'var(--color-text-muted)', border: 'none', background: 'none', cursor: 'pointer' }} title="Edit">
                                            <Pencil size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(contact.contact_id)} style={{ color: 'var(--color-danger)', border: 'none', background: 'none', cursor: 'pointer' }} title="Delete">
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
            {contacts.map(contact => (
                <div key={contact.contact_id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ color: 'var(--color-primary-dark)' }}>{contact.name}</h3>
                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                            <button onClick={() => onEdit(contact)} style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
                                <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(contact.contact_id)} style={{ color: 'var(--color-danger)', padding: '4px' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        {contact.role} {contact.company && `at ${contact.company}`}
                    </div>

                    <div style={{ marginTop: 'var(--spacing-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <Mail size={16} /> <span>{contact.email}</span>
                        </div>
                        {contact.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                <Phone size={16} /> <span>{contact.phone}</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;
