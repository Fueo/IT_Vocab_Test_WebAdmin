import React, { useState, useEffect } from 'react';

export default function Header({ title, toggleSidebar }) {
    const [user, setUser] = useState({ name: 'Admin', email: 'admin@itvocab.com' });

    useEffect(() => {
        // Lấy dữ liệu user từ localStorage
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // Cập nhật state với dữ liệu thật từ API
                setUser({
                    name: parsedUser.fullName || parsedUser.name || 'Admin',
                    email: parsedUser.email || 'admin@itvocab.com'
                });
            } catch (error) {
                console.error("Lỗi parse user data:", error);
            }
        }
    }, []);

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
                    {/* Gắn dữ liệu thật vào đây */}
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                </div>
            </div>
        </header>
    );
}