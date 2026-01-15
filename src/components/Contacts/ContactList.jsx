import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../store/slices/contactsSlice';
import { Pencil, Trash2, Mail, Phone, Building } from 'lucide-react';

const ContactList = ({ onEdit }) => {
    const contacts = useSelector(state => state.contacts.items);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            dispatch(deleteContact(id));
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
            {contacts.map(contact => (
                <div key={contact.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ color: 'var(--color-primary-dark)' }}>{contact.name}</h3>
                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                            <button onClick={() => onEdit(contact)} style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
                                <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(contact.id)} style={{ color: 'var(--color-danger)', padding: '4px' }}>
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
