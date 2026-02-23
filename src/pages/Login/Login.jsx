import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import Toast from '../../components/common/Toast'; // Đảm bảo đường dẫn import Toast đúng

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // State quản lý Toast
    const [toast, setToast] = useState({ show: false, message: '', type: 'error' }); 
    const navigate = useNavigate();

    // Hàm tiện ích để gọi nhanh Toast
    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

const handleSubmit = async (e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation(); 
    }

    setToast({ show: false, message: '', type: 'error' });
    setIsLoading(true);

    try {
        const response = await api.post('/auth/login', {
            email: email,
            password: password
        });

        // Nếu thành công
        const { accessToken, refreshToken, user } = response.data;

        if (user && String(user.role).toUpperCase() !== 'ADMIN') {
            showToast('Tài khoản không có quyền quản trị.', 'warning');
            setIsLoading(false);
            return; 
        }

        localStorage.setItem('adminAccessToken', accessToken);
        localStorage.setItem('adminRefreshToken', refreshToken);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        showToast('Đăng nhập thành công!', 'success');
        
        setTimeout(() => {
            navigate('/dashboard', { replace: true });
        }, 700); 

    } catch (err) {
        console.error("Login Error Details:", err);

        // Lấy message từ Backend
        const backendMessage = err.response?.data?.message || 'Lỗi kết nối máy chủ.';
        
        // Gọi hiển thị Toast
        showToast(backendMessage, 'error');
        
    } finally {
        // Luôn tắt loading cho dù thành công hay thất bại
        setIsLoading(false); 
    }
};

    return (
        <div className="login-container" style={{ position: 'relative' }}>
            
            {/* COMPONENT TOAST THÔNG BÁO */}
            <Toast 
                show={toast.show} 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast({ ...toast, show: false })} 
            />

            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h1 className="login-title">IT Vocab Admin</h1>
                    <p className="login-description">Đăng nhập để quản lý hệ thống</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            <input 
                                type="email" 
                                id="email" 
                                className="form-input" 
                                placeholder="admin@itvocab.com" 
                                required 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Mật khẩu</label>
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            <input 
                                type="password" 
                                id="password" 
                                className="form-input" 
                                placeholder="********" 
                                required 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ marginTop: '1.5rem' }}>
                        {isLoading ? 'Đang tải' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
}