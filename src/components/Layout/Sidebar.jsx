import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Target, Briefcase } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: Home },
        { path: '/contacts', label: 'Contacts', icon: Users },
        { path: '/leads', label: 'Leads', icon: Target },
        { path: '/deals', label: 'Deals', icon: Briefcase },
    ];

    return (
        <aside style={{
            width: '240px',
            backgroundColor: 'var(--color-surface)',
            borderRight: '1px solid var(--color-border)',
            height: '100vh',
            padding: 'var(--spacing-lg)',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed'
        }}>
            <div style={{ marginBottom: 'var(--spacing-xl)', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                KOKUYO CRM
            </div>
            <nav>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    style={({ isActive }) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-sm)',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                                        backgroundColor: isActive ? '#E6F0FA' : 'transparent', // Light primary
                                        fontWeight: isActive ? 600 : 400,
                                        transition: 'all 0.2s ease',
                                    })}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
