import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout title="Tổng quan" activePath="/dashboard">
            {/* 4 Thẻ Thống Kê */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon cyan">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <span className="stat-change">+12.5%</span>
                    </div>
                    <h3 className="stat-value">1,284</h3>
                    <p className="stat-label">Người dùng mới</p>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon green">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                            </svg>
                        </div>
                        <span className="stat-change">+8.2%</span>
                    </div>
                    <h3 className="stat-value">3,450</h3>
                    <p className="stat-label">Tổng Từ vựng</p>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon purple">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <path d="M12 17h.01" />
                            </svg>
                        </div>
                        <span className="stat-change">+15.3%</span>
                    </div>
                    <h3 className="stat-value">5,678</h3>
                    <p className="stat-label">Tổng Câu hỏi</p>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon orange">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <span className="stat-change text-orange">-5 từ hôm qua</span>
                    </div>
                    <h3 className="stat-value">23</h3>
                    <p className="stat-label">Góp ý chưa xử lý</p>
                </div>
            </div>

            {/* 2 Khung Biểu Đồ */}
            <div className="charts-grid">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title chart-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                <polyline points="16 7 22 7 22 13" />
                            </svg>
                            Người dùng hoạt động (7 ngày)
                        </h2>
                    </div>
                    <div className="card-content">
                        <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}>
                            <p style={{ color: '#717182' }}>Khu vực hiển thị biểu đồ</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title chart-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                            Tăng trưởng từ vựng (6 tháng)
                        </h2>
                    </div>
                    <div className="card-content">
                        <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px' }}>
                            <p style={{ color: '#717182' }}>Khu vực hiển thị biểu đồ</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hoạt động gần đây */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Hoạt động gần đây</h2>
                </div>
                <div className="card-content">
                    <div className="activity-list">

                        <div className="activity-item">
                            <div className="activity-dot"></div>
                            <div className="activity-content">
                                <p className="activity-action">Người dùng <strong>Nguyễn Văn A</strong> vừa đăng ký tài khoản mới.</p>
                                <p className="activity-time">5 phút trước</p>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-dot" style={{ background: '#22c55e' }}></div>
                            <div className="activity-content">
                                <p className="activity-action">Admin đã thêm 50 từ vựng mới vào chủ đề <strong>React Native</strong>.</p>
                                <p className="activity-time">2 giờ trước</p>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-dot" style={{ background: '#f97316' }}></div>
                            <div className="activity-content">
                                <p className="activity-action">Hệ thống nhận được 2 góp ý lỗi từ người dùng.</p>
                                <p className="activity-time">Hôm qua lúc 15:30</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}