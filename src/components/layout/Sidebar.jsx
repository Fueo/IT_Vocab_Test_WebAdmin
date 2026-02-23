import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../utils/axios';

/**
 * Sidebar Component
 */
export default function Sidebar({ collapsed = false }) {
    const navigate = useNavigate();
    const location = useLocation();
    const activePath = location.pathname;

    // Lấy thông tin user và token từ localStorage
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    const handleLogout = async (e) => {
        e.preventDefault();
        
        if (!window.confirm('Bạn có chắc chắn muốn đăng xuất?')) return;

        try {
            // Lấy refreshToken từ localStorage để gửi kèm API
            const refreshToken = localStorage.getItem('adminRefreshToken');

            // 1. Gọi API Logout kèm theo refreshToken trong body
            await api.post('/auth/logout', { refreshToken });
            
        } catch (err) {
            console.error("Logout API Error:", err);
            // Ngay cả khi API lỗi (ví dụ token hết hạn), ta vẫn dọn dẹp client
        } finally {
            // 2. Xóa sạch dữ liệu ở LocalStorage
            localStorage.clear(); 
            
            // 3. Điều hướng về Login và chặn quay lại trang cũ
            navigate('/login', { replace: true });
        }
    };

    const getActiveClass = (path) => activePath === path ? 'active' : '';

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">
            {/* Header: Logo và tiêu đề */}
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                </div>
                <div className="sidebar-brand">
                    <span className="sidebar-title">IT Vocab Admin</span>
                    {adminUser.email && <small className="user-email" style={{display: 'block', fontSize: '10px', opacity: 0.7}}>{adminUser.email}</small>}
                </div>
            </div>

            {/* Navigation: Danh sách menu, có flex: 1 để đẩy footer xuống */}
            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li>
                        <Link to="/dashboard" className={`nav-link ${getActiveClass('/dashboard')}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                            <span>Tổng quan</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/vocabulary" className={`nav-link ${getActiveClass('/vocabulary')}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                            <span>Quản lý Từ vựng</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/topics" className={`nav-link ${getActiveClass('/topics')}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg>
                            <span>Quản lý Chủ đề</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/questions" className={`nav-link ${getActiveClass('/questions')}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                            <span>Quản lý Câu hỏi</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/users" className={`nav-link ${getActiveClass('/users')}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <span>Quản lý Người dùng</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/feedback" className={`nav-link ${getActiveClass('/feedback')}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            <span>Góp ý & Bảo trì</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/inventory" className={`nav-link ${getActiveClass('/inventory')}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
                            <span>Quản lý Vật phẩm</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Footer: Luôn nằm ở dưới cùng */}
            <div className="sidebar-footer">
                <button 
                    onClick={handleLogout} 
                    className="logout-button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <span>Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
}