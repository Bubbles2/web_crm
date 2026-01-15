import React, { useState } from 'react';
import LeadList from '../components/Leads/LeadList';
import LeadForm from '../components/Leads/LeadForm';
import PageHeader from '../components/Layout/PageHeader';
import { Plus, LayoutGrid, List } from 'lucide-react';

const Leads = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [viewMode, setViewMode] = useState('card');

    const handleCreate = () => {
        setEditingLead(null);
        setIsModalOpen(true);
    };

    const handleEdit = (lead) => {
        setEditingLead(lead);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingLead(null);
    };

    return (
        <div>
            <PageHeader
                title="Leads"
                subtitle="Track potential clients"
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
                        <Plus size={20} /> Add Lead
                    </button>
                </div>
            </PageHeader>

            <LeadList onEdit={handleEdit} viewMode={viewMode} />

            {isModalOpen && (
                <LeadForm
                    onClose={handleClose}
                    initialData={editingLead}
                />
            )}
        </div>
    );
};

export default Leads;
