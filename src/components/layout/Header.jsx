import React from 'react';

export default function Header({ title, toggleSidebar }) {
    return (
        <header className="header">
            <div className="header-left">
                <button className="btn btn-ghost btn-icon" onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                </button>
                <h1 className="page-title">{title}</h1>
            </div>
            <div className="header-right">
                <div className="user-info">
                    <p className="user-name">Admin</p>
                    <p className="user-email">admin@itvocab.com</p>
                </div>
            </div>
        </header>
    );
}