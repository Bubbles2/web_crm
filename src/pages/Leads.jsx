import React, { useState } from 'react';
import LeadList from '../components/Leads/LeadList';
import LeadForm from '../components/Leads/LeadForm';
import { Plus } from 'lucide-react';

const Leads = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1>Leads</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Track potential clients</p>
                </div>
                <button className="btn btn-primary" onClick={handleCreate}>
                    <Plus size={20} /> Add Lead
                </button>
            </div>

            <LeadList onEdit={handleEdit} />

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
