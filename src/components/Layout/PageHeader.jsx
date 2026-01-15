import React from 'react';
import headerBg from '../../assets/header-bg.png';

const PageHeader = ({ title, subtitle, children }) => {
    return (
        <div style={{
            backgroundImage: `url(${headerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: 'var(--spacing-2xl) var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--spacing-xl)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                borderRadius: 'var(--radius-md)',
                backdropFilter: 'blur(4px)'
            }}>
                <h1 style={{
                    margin: 0,
                    color: 'var(--color-primary)',
                    fontSize: '2rem'
                }}>
                    {title}
                </h1>
                {subtitle && (
                    <p style={{
                        margin: 'var(--spacing-xs) 0 0 0',
                        color: 'var(--color-text-muted)',
                        fontWeight: 500
                    }}>
                        {subtitle}
                    </p>
                )}
            </div>
            {children && (
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: 'var(--spacing-sm)',
                    borderRadius: 'var(--radius-md)',
                    backdropFilter: 'blur(4px)'
                }}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
