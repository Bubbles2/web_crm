import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{
                marginLeft: '240px',
                padding: 'var(--spacing-xl)',
                width: 'calc(100% - 240px)',
                minHeight: '100vh',
                backgroundColor: 'var(--color-bg)'
            }}>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
