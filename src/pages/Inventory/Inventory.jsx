import React, { useState } from 'react';

export default function Inventory() {
    const [activeModal, setActiveModal] = useState(null);

    // Dữ liệu mẫu hiển thị ra Grid thay vì hiển thị "Đang tải dữ liệu..."
    const mockItems = [
        { id: 1, name: "XP Boost x2", desc: "Tăng gấp đôi lượng XP nhận được trong 24 giờ", price: 500, stock: "Không giới hạn", type: "Tăng cường", iconColor: "cyan" },
        { id: 2, name: "Khung Avatar Vàng", desc: "Viền avatar mạ vàng độc quyền cho tài khoản", price: 2000, stock: "Còn 5", type: "Trang trí", iconColor: "purple" },
        { id: 3, name: "Hồi sinh chuỗi (Streak)", desc: "Khôi phục chuỗi học tập (Spirit) đã bị mất ngày hôm qua", price: 1000, stock: "Không giới hạn", type: "Phần thưởng", iconColor: "pink" },
    ];

    const closeModal = () => setActiveModal(null);

    return (
        <>
            
            {/* 4 Thẻ Thống kê */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Tổng vật phẩm</p>
                            <h3 className="stat-value">12</h3>
                        </div>
                        <div className="stat-icon cyan">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Phần thưởng</p>
                            <h3 className="stat-value" style={{ color: 'var(--primary)' }}>4</h3>
                        </div>
                        <div className="stat-icon cyan">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Tăng cường</p>
                            <h3 className="stat-value" style={{ color: 'var(--secondary)' }}>3</h3>
                        </div>
                        <div className="stat-icon purple">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Trang trí</p>
                            <h3 className="stat-value" style={{ color: '#ec4899' }}>5</h3>
                        </div>
                        <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" /><path d="M12 12V2" /><path d="m4.93 10.93 1.41 1.41" /><path d="m2 8 2.59 2.59" /><path d="m19.07 10.93-1.41 1.41" /><path d="m22 8-2.59 2.59" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header card-header-flex">
                    <h2 className="card-title">Quản lý Kho đồ</h2>
                    <button className="btn btn-primary" onClick={() => setActiveModal('add')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        Thêm vật phẩm
                    </button>
                </div>
                
                <div className="card-content">
                    <div className="filters-row">
                        <div className="search-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <input type="text" className="search-input" placeholder="Tìm kiếm vật phẩm..." />
                        </div>
                        <select className="filter-select" defaultValue="all">
                            <option value="all">Tất cả</option>
                            <option value="reward">Phần thưởng</option>
                            <option value="power-up">Tăng cường</option>
                            <option value="cosmetic">Trang trí</option>
                        </select>
                    </div>

                    {/* Lưới danh sách Vật phẩm (Grid Cards) */}
                    <div className="items-grid">
                        {mockItems.map((item) => (
                            <div className="item-card" key={item.id}>
                                <div className="item-header">
                                    <div className={`item-icon ${item.iconColor}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {item.iconColor === 'cyan' && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />}
                                            {item.iconColor === 'purple' && <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />}
                                            {item.iconColor === 'pink' && <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />}
                                        </svg>
                                    </div>
                                    <span className="badge badge-outline">{item.type}</span>
                                </div>
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-description">{item.desc}</p>
                                <div className="item-meta">
                                    <span className="item-price">🪙 {item.price} Coins</span>
                                    <span className="item-stock">Kho: {item.stock}</span>
                                </div>
                                <div className="item-actions">
                                    <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={() => setActiveModal('edit')}>Chỉnh sửa</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="table-count" style={{ marginTop: '1.5rem' }}>Hiển thị 3 trên 12 kết quả</p>
                </div>
            </div>

            {/* Modal Thêm Mới */}
            <div className={`modal-overlay ${activeModal === 'add' ? 'active' : ''}`}>
                <div className="modal modal-lg">
                    <div className="modal-header">
                        <h3 className="modal-title">Thêm Vật phẩm mới</h3>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Tên vật phẩm *</label>
                            <input type="text" className="form-input-simple" placeholder="VD: XP Boost x2" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Mô tả</label>
                            <textarea className="form-textarea" placeholder="Mô tả về vật phẩm..."></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Loại vật phẩm</label>
                                <select className="form-select" defaultValue="reward">
                                    <option value="reward">Phần thưởng</option>
                                    <option value="power-up">Tăng cường</option>
                                    <option value="cosmetic">Trang trí</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Giá (coins)</label>
                                <input type="number" className="form-input-simple" defaultValue="0" min="0" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={closeModal}>Hủy</button>
                        <button className="btn btn-primary" onClick={closeModal}>Thêm</button>
                    </div>
                </div>
            </div>

            {/* Modal Edit (Rút gọn) */}
            {/* Tương tự như Modal Thêm Mới nhưng lấy dữ liệu truyền vào */}

        </>
    );
}