import React from 'react';

export default function Sidebar({ activePath }) {
    const handleLogout = (e) => {
        e.preventDefault();
        console.log("Đăng xuất");
    };

    return (
        <>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                </div>
                <span className="sidebar-title">IT Vocab Admin</span>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li>
                        <a href="/dashboard" className={`nav-link ${activePath === '/dashboard' ? 'active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                            <span>Tổng quan</span>
                        </a>
                    </li>
                    <li>
                        <a href="/vocabulary" className={`nav-link ${activePath === '/vocabulary' ? 'active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                            <span>Quản lý Từ vựng</span>
                        </a>
                    </li>
                    <li>
                        <a href="/topics" className={`nav-link ${activePath === '/topics' ? 'active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg>
                            <span>Quản lý Chủ đề</span>
                        </a>
                    </li>
                    <li>
                        <a href="/users" className={`nav-link ${activePath === '/users' ? 'active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6a4 4 0 0 1 4 4v2m-3-9v9m3-9v9" /><path d="M7 7h.01" /></svg>
                            <span>Quản lý Người dùng</span>
                        </a>
                    </li>
                    <li>
                        <a href="/feedback" className={`nav-link ${activePath === '/feedback' ? 'active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            <span>Góp ý & Bảo trì</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <a href="#" onClick={handleLogout} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', gap: '0.75rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                    <span>Đăng xuất</span>
                </a>
            </div>
        </>
    );
}