import React, { useState } from 'react';
import DealList from '../components/Deals/DealList';
import DealForm from '../components/Deals/DealForm';
import { Plus } from 'lucide-react';

const Deals = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDeal, setEditingDeal] = useState(null);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1>Deals</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Manage your sales pipeline</p>
                </div>
                <button className="btn btn-primary" onClick={handleCreate}>
                    <Plus size={20} /> Add Deal
                </button>
            </div>

            <DealList onEdit={handleEdit} />

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
