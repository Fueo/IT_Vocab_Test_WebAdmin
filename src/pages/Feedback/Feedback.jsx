import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout'; // Đường dẫn tùy cấu trúc thư mục của bạn

export default function Feedback() {
    // State để điều khiển đóng/mở modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hàm mở modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Hàm đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AdminLayout title="Góp ý & Bảo trì" activePath="/feedback">
            {/* Thống kê */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Tổng góp ý</p>
                            <h3 className="stat-value">6</h3>
                        </div>
                        <div className="stat-icon cyan">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Chưa xử lý</p>
                            <h3 className="stat-value" style={{ color: '#3b82f6' }}>2</h3>
                        </div>
                        <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v4" />
                                <path d="M12 16h.01" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Đang xử lý</p>
                            <h3 className="stat-value" style={{ color: '#ca8a04' }}>2</h3>
                        </div>
                        <div className="stat-icon" style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#ca8a04' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Đã hoàn thành</p>
                            <h3 className="stat-value" style={{ color: '#22c55e' }}>2</h3>
                        </div>
                        <div className="stat-icon green">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bảng danh sách */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Góp ý & Bảo trì</h2>
                </div>
                <div className="card-content">
                    <div className="filters-row">
                        <div className="search-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input type="text" className="search-input" placeholder="Tìm kiếm góp ý..." />
                        </div>
                        <select className="filter-select" defaultValue="all">
                            <option value="all">Tất cả</option>
                            <option value="new">Mới</option>
                            <option value="in-progress">Đang xử lý</option>
                            <option value="completed">Đã xong</option>
                        </select>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nội dung</th>
                                    <th>Người gửi</th>
                                    <th>Loại</th>
                                    <th>Thời gian</th>
                                    {/* Thêm textAlign center cho cột trạng thái */}
                                    <th style={{ textAlign: 'center' }}>Trạng thái</th>
                                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Dữ liệu mẫu 1 */}
                                <tr>
                                    <td>
                                        <div className="truncate" style={{ maxWidth: '250px' }}>
                                            Ứng dụng rất hữu ích nhưng cần thêm chức năng ôn tập theo khoảng thời gian...
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>Nguyễn Văn A</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>nguyenvana@example.com</p>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-purple">Feature Request</span></td>
                                    <td>2024-01-12 14:30</td>
                                    {/* Thêm textAlign center cho ô trạng thái */}
                                    <td style={{ textAlign: 'center' }}>
                                        <span className="badge badge-blue flex-center" style={{ justifyContent: 'center' }}>
                                            Mới
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="btn btn-outline btn-sm" onClick={handleOpenModal}>Chi tiết</button>
                                    </td>
                                </tr>

                                {/* Dữ liệu mẫu 2 */}
                                <tr>
                                    <td>
                                        <div className="truncate" style={{ maxWidth: '250px' }}>
                                            Lỗi hiển thị từ vựng tiếng Nhật trên màn hình iPhone 13 mini.
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>Trần Thị B</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>tranthib@example.com</p>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-red">Bug Report</span></td>
                                    <td>2024-01-11 09:15</td>
                                    {/* Thêm textAlign center cho ô trạng thái */}
                                    <td style={{ textAlign: 'center' }}>
                                        <span className="badge badge-yellow flex-center" style={{ justifyContent: 'center' }}>
                                            Đang xử lý
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="btn btn-outline btn-sm" onClick={handleOpenModal}>Chi tiết</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <p className="table-count">Hiển thị 2 trên 6 kết quả</p>
                    </div>
                </div>
            </div>

            {/* Modal Chi Tiết */}
            <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
                <div className="modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Chi tiết Góp ý</h3>
                        <p className="modal-description">ID: #1</p>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Nội dung:</h4>
                            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                                Ứng dụng rất hữu ích nhưng cần thêm chức năng ôn tập theo khoảng thời gian (spaced repetition)
                            </p>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Người gửi:</h4>
                                <p style={{ fontSize: '0.875rem' }}>Nguyễn Văn A</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>nguyenvana@example.com</p>
                            </div>
                            <div className="form-group">
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Thời gian:</h4>
                                <p style={{ fontSize: '0.875rem' }}>2024-01-12 14:30</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Loại:</h4>
                                <span className="badge badge-purple">Feature Request</span>
                            </div>
                            <div className="form-group">
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Trạng thái:</h4>
                                <span className="badge badge-blue flex-center" style={{ width: 'fit-content' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 8v4" />
                                        <path d="M12 16h.01" />
                                    </svg>
                                    Mới
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={handleCloseModal}>Đóng</button>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}