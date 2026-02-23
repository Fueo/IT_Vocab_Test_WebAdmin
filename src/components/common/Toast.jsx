import React, { useEffect } from 'react';

export default function Toast({ show, message, type = 'info', onClose, duration = 3000 }) {
    // Tự động đóng Toast sau khoảng thời gian (mặc định 3s)
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show) return null;

    // Cấu hình màu sắc cho từng loại
    const config = {
        success: { color: '#10b981', icon: <CheckIcon /> },
        error: { color: '#ef4444', icon: <ErrorIcon /> },
        warning: { color: '#f59e0b', icon: <WarningIcon /> },
        info: { color: '#3b82f6', icon: <InfoIcon /> }
    };

    const currentConfig = config[type] || config.info;

    return (
        <>
            <div 
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: currentConfig.color,
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'slideInRight 0.3s ease-out'
                }}
            >
                {currentConfig.icon}
                <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{message}</span>
                
                {/* Nút đóng thủ công */}
                <button 
                    onClick={onClose} 
                    style={{
                        background: 'transparent', border: 'none', color: 'white', 
                        cursor: 'pointer', marginLeft: '10px', opacity: 0.8, display: 'flex'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            {/* Khai báo animation toàn cục (nếu chưa có trong file css chung) */}
            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </>
    );
}

// Các Icon SVG dùng cho Toast
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
);
const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);