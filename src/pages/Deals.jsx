import React, { useState } from 'react';
import DealList from '../components/Deals/DealList';
import DealForm from '../components/Deals/DealForm';
import PageHeader from '../components/Layout/PageHeader';
import { Plus, LayoutGrid, List } from 'lucide-react';

const Deals = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDeal, setEditingDeal] = useState(null);
    const [viewMode, setViewMode] = useState('card');

    const handleCreate = () => {
        setEditingDeal(null);
        setIsModalOpen(true);
    };

    const handleEdit = (deal) => {
        setEditingDeal(deal);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingDeal(null);
    };

    return (
        <div>
            <PageHeader
                title="Deals"
                subtitle="Manage your sales pipeline"
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
                        <Plus size={20} /> Add Deal
                    </button>
                </div>
            </PageHeader>

            <DealList onEdit={handleEdit} viewMode={viewMode} />

            {isModalOpen && (
                <DealForm
                    onClose={handleClose}
                    initialData={editingDeal}
                />
            )}
        </div>
    );
};

export default Deals;
