import React, { useState } from 'react';
import Sidebar from './Sidebar';

// Gộp chung Header vào layout này cho giống cấu trúc HTML gốc
export default function AdminLayout({ children, title, activePath }) {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>

            {/* Sidebar Component */}
            <div className={isSidebarCollapsed ? "sidebar collapsed" : "sidebar"} id="sidebar">
                <Sidebar activePath={activePath} />
            </div>

            {/* Main Content Wrapper */}
            <div
                className="main-content"
                style={{
                    flex: 1,
                    minWidth: 0,
                    marginLeft: isSidebarCollapsed ? '80px' : '256px',
                    transition: 'margin-left 0.3s ease'
                }}
            >
                {/* Header (Top Bar) NẰM TRONG main-content */}
                <header className="header" style={{ display: 'flex', width: '100%' }}>
                    <div className="header-left">
                        <button
                            className="btn btn-ghost btn-icon"
                            id="toggleSidebar"
                            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        </button>
                        <h1 className="page-title">{title}</h1>
                    </div>
                    <div className="header-right" style={{ marginLeft: 'auto' }}>
                        <div className="user-info">
                            <p className="user-name">Admin</p>
                            <p className="user-email">admin@itvocab.com</p>
                        </div>
                    </div>
                </header>

                {/* Phần ruột thay đổi theo từng trang */}
                <main className="content">
                    {children}
                </main>
            </div>

        </div>
    );
}