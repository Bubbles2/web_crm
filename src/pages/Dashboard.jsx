import React from 'react';
import { useSelector } from 'react-redux';
import { Users, Target, Briefcase, DollarSign } from 'lucide-react';
import PageHeader from '../components/Layout/PageHeader';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <div style={{
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-full)',
            backgroundColor: `${color}20`,
            color: color
        }}>
            <Icon size={24} />
        </div>
        <div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{title}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</div>
        </div>
    </div>
);

const Dashboard = () => {
    const contacts = useSelector(state => state.contacts.items);
    const leads = useSelector(state => state.leads.items);
    const deals = useSelector(state => state.deals.items);

    const totalContacts = contacts.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const activeDeals = deals.filter(d => !['Closed Won', 'Closed Lost'].includes(d.stage)).length;
    const totalRevenue = deals
        .filter(d => d.stage === 'Closed Won')
        .reduce((sum, d) => sum + d.amount, 0);

    const formattedRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRevenue);

    return (
        <div>
            <PageHeader
                title="Welcome Back!"
                subtitle="Here is what's happening in your CRM today."
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <StatCard title="Total Contacts" value={totalContacts} icon={Users} color="var(--color-primary)" />
                <StatCard title="New Leads" value={newLeads} icon={Target} color="var(--color-accent)" />
                <StatCard title="Active Deals" value={activeDeals} icon={Briefcase} color="var(--color-warning)" />
                <StatCard title="Revenue Won" value={formattedRevenue} icon={DollarSign} color="#2ecc71" />
            </div>

            <div className="card">
                <h3>Quick Actions</h3>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                    <a href="/contacts" className="btn btn-secondary">Manage Contacts</a>
                    <a href="/leads" className="btn btn-secondary">View Leads</a>
                    <a href="/deals" className="btn btn-secondary">Update Deals</a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
