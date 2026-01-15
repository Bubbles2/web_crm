import React, { useState } from 'react';
import ContactList from '../components/Contacts/ContactList';
import ContactForm from '../components/Contacts/ContactForm';
import PageHeader from '../components/Layout/PageHeader';
import { Plus, LayoutGrid, List } from 'lucide-react';

const Contacts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [viewMode, setViewMode] = useState('card');

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
            <PageHeader
                title="Contacts"
                subtitle="Manage your professional network"
            >
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <div style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-md)',
                        padding: '4px',
                        border: '1px solid var(--color-border)'
                    }}>
                        <button
                            onClick={() => setViewMode('card')}
                            style={{
                                padding: '6px',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: viewMode === 'card' ? 'var(--color-primary-light)' : 'transparent',
                                color: viewMode === 'card' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex'
                            }}
                            title="Card View"
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            style={{
                                padding: '6px',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: viewMode === 'list' ? 'var(--color-primary-light)' : 'transparent',
                                color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex'
                            }}
                            title="List View"
                        >
                            <List size={20} />
                        </button>
                    </div>
                    <button className="btn btn-primary" onClick={handleCreate}>
                        <Plus size={20} /> Add Contact
                    </button>
                </div>
            </PageHeader>

            <ContactList onEdit={handleEdit} viewMode={viewMode} />

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
