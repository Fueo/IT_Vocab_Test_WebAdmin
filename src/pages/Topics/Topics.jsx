import React, { useState } from 'react';

export default function Topics() {
    // Quản lý Modal: null (đóng), 'add', 'edit', 'import', 'export'
    const [activeModal, setActiveModal] = useState(null);
    
    // Quản lý trạng thái chọn màu cho Chủ đề mới
    const [selectedColor, setSelectedColor] = useState('blue');

    const colors = [
        { id: 'blue', bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', label: 'Xanh dương' },
        { id: 'green', bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', label: 'Xanh lá' },
        { id: 'purple', bg: 'rgba(144, 56, 255, 0.1)', color: '#9038FF', label: 'Tím' },
        { id: 'orange', bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', label: 'Cam' },
        { id: 'pink', bg: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', label: 'Hồng' },
        { id: 'yellow', bg: 'rgba(234, 179, 8, 0.1)', color: '#ca8a04', label: 'Vàng' },
    ];

    const mockTopics = [
        { id: 1, name: "Web Development", desc: "Các thuật ngữ liên quan đến phát triển web", count: 150, color: colors[0] },
        { id: 2, name: "Database", desc: "SQL, NoSQL và các khái niệm cơ sở dữ liệu", count: 85, color: colors[1] },
        { id: 3, name: "DevOps", desc: "CI/CD, Docker, Kubernetes, Cloud", count: 64, color: colors[3] },
    ];

    const closeModal = () => setActiveModal(null);

    return (
        <>
            <div className="card">
                <div className="card-header card-header-flex">
                    <h2 className="card-title">Quản lý Chủ đề</h2>
                    <div className="header-actions">
                        <button className="btn btn-outline" onClick={() => setActiveModal('export')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                            Export
                        </button>
                        <button className="btn btn-outline" onClick={() => setActiveModal('import')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                            Import
                        </button>
                        <button className="btn btn-primary" onClick={() => setActiveModal('add')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            Thêm mới
                        </button>
                    </div>
                </div>
                <div className="card-content">
                    <div className="search-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        <input type="text" className="search-input" placeholder="Tìm kiếm chủ đề..." />
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Chủ đề</th>
                                    <th>Mô tả</th>
                                    <th>Số từ vựng</th>
                                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockTopics.map((topic) => (
                                    <tr key={topic.id}>
                                        <td>
                                            <div className="topic-badge">
                                                <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: topic.color.color }}></span>
                                                <span style={{ fontWeight: 500 }}>{topic.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: 'var(--muted-foreground)' }}>{topic.desc}</td>
                                        <td>{topic.count} từ</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn btn-outline btn-sm" onClick={() => setActiveModal('edit')}>Sửa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                         <p className="table-count">Hiển thị 3 trên 3 kết quả</p>
                    </div>
                </div>
            </div>

            {/* Modal Thêm Mới */}
            <div className={`modal-overlay ${activeModal === 'add' ? 'active' : ''}`}>
                <div className="modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Thêm Chủ đề mới</h3>
                        <p className="modal-description">Tạo chủ đề để phân loại từ vựng</p>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Tên chủ đề *</label>
                            <input type="text" className="form-input-simple" placeholder="VD: Web Development" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Mô tả</label>
                            <textarea className="form-textarea" placeholder="Mô tả về chủ đề này..."></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Màu sắc</label>
                            <div className="color-picker">
                                {colors.map(c => (
                                    <div 
                                        key={c.id} 
                                        className={`color-option ${selectedColor === c.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedColor(c.id)}
                                    >
                                        <div className="color-preview" style={{ background: c.bg, color: c.color }}>{c.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={closeModal}>Hủy</button>
                        <button className="btn btn-primary" onClick={closeModal}>Thêm</button>
                    </div>
                </div>
            </div>

            {/* Modal Edit tương tự (đã rút gọn để hiển thị) */}
            <div className={`modal-overlay ${activeModal === 'edit' ? 'active' : ''}`}>
                <div className="modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Chỉnh sửa chủ đề</h3>
                        <p className="modal-description">Cập nhật thông tin chủ đề</p>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Tên chủ đề *</label>
                            <input type="text" className="form-input-simple" defaultValue="Web Development" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Mô tả</label>
                            <textarea className="form-textarea" defaultValue="Các thuật ngữ liên quan đến phát triển web"></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={closeModal}>Hủy</button>
                        <button className="btn btn-primary" onClick={closeModal}>Cập nhật</button>
                    </div>
                </div>
            </div>

            {/* Modal Import */}
            <div className={`modal-overlay ${activeModal === 'import' ? 'active' : ''}`}>
                <div className="modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Import chủ đề</h3>
                        <p className="modal-description">Tải lên file Excel hoặc JSON chứa danh sách chủ đề</p>
                    </div>
                    <div className="modal-body">
                        <div className="upload-zone">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                            <p className="upload-text">Kéo thả file hoặc click để chọn</p>
                            <p className="upload-hint">Hỗ trợ: .xlsx, .csv, .json (Tối đa 5MB)</p>
                            <input type="file" accept=".xlsx,.csv,.json" style={{ marginTop: '1rem' }} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={closeModal}>Hủy</button>
                        <button className="btn btn-primary" onClick={closeModal}>Tải lên</button>
                    </div>
                </div>
            </div>
            
        </>
    );
}