import React, { useState } from 'react';
import ContactList from '../components/Contacts/ContactList';
import ContactForm from '../components/Contacts/ContactForm';
import { Plus } from 'lucide-react';

const Contacts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    const handleCreate = () => {
        setEditingContact(null);
        setIsModalOpen(true);
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingContact(null);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1>Contacts</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Manage your professional network</p>
                </div>
                <button className="btn btn-primary" onClick={handleCreate}>
                    <Plus size={20} /> Add Contact
                </button>
            </div>

            <ContactList onEdit={handleEdit} />

            {isModalOpen && (
                <ContactForm
                    onClose={handleClose}
                    initialData={editingContact}
                />
            )}
        </div>
    );
};

export default Contacts;
