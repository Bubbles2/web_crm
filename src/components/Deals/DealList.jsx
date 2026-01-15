import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDeal } from '../../store/slices/dealsSlice';
import { Pencil, Trash2, DollarSign, Briefcase } from 'lucide-react';

const DealList = ({ onEdit }) => {
    const deals = useSelector(state => state.deals.items);
    const contacts = useSelector(state => state.contacts.items);
    const leads = useSelector(state => state.leads.items);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this deal?')) {
            dispatch(deleteDeal(id));
        }
    };

    const getLinkedEntityName = (deal) => {
        if (deal.contactId) {
            const contact = contacts.find(c => c.id === deal.contactId);
            return contact ? `Contact: ${contact.name}` : 'Unknown Contact';
        }
        if (deal.leadId) {
            const lead = leads.find(l => l.id === deal.leadId);
            return lead ? `Lead: ${lead.name}` : 'Unknown Lead';
        }
        return 'Unassigned';
    };

    const formattedAmount = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const getStageColor = (stage) => {
        if (stage === 'Closed Won') return 'var(--color-accent)';
        if (stage === 'Closed Lost') return 'var(--color-danger)';
        return 'var(--color-primary)';
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
            {deals.map(deal => (
                <div key={deal.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ color: 'var(--color-primary-dark)' }}>{deal.title}</h3>
                        <span style={{
                            fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px',
                            backgroundColor: getStageColor(deal.stage), color: 'white'
                        }}>
                            {deal.stage}
                        </span>
                    </div>

                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <DollarSign size={20} color="var(--color-accent)" /> {formattedAmount(deal.amount)}
                    </div>

                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                        <Briefcase size={16} /> {getLinkedEntityName(deal)}
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-sm)', borderTop: '1px solid var(--color-border)' }}>
                        <button onClick={() => onEdit(deal)} style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
                            <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(deal.id)} style={{ color: 'var(--color-danger)', padding: '4px' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DealList;
