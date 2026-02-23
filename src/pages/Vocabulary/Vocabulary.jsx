import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

export default function Vocabulary() {
    // Quản lý Modal: null (đóng), 'add', 'edit', 'import', 'export'
    const [activeModal, setActiveModal] = useState(null);

    const mockVocabs = [
        { id: 1, term: "API", def: "Application Programming Interface - Giao diện lập trình ứng dụng", topic: "Web Development", level: "Intermediate", levelColor: "badge-purple" },
        { id: 2, term: "Frontend", def: "Phần giao diện người dùng của một trang web hoặc ứng dụng", topic: "Web Development", level: "Beginner", levelColor: "badge-green" },
        { id: 3, term: "Polymorphism", def: "Tính đa hình trong lập trình hướng đối tượng (OOP)", topic: "Programming Core", level: "Advanced", levelColor: "badge-red" },
    ];

    const closeModal = () => setActiveModal(null);

    return (
        <AdminLayout title="Quản lý Từ vựng" activePath="/vocabulary">
            <div className="card">
                <div className="card-header card-header-flex">
                    <h2 className="card-title">Quản lý Từ vựng</h2>
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
                        <input type="text" className="search-input" placeholder="Tìm kiếm từ vựng..." />
                    </div>
                    
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Thuật ngữ</th>
                                    <th>Định nghĩa</th>
                                    <th>Chủ đề</th>
                                    <th>Cấp độ</th>
                                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockVocabs.map((vocab) => (
                                    <tr key={vocab.id}>
                                        <td style={{ fontWeight: 600 }}>{vocab.term}</td>
                                        <td>
                                            <div className="truncate" style={{ maxWidth: '300px' }}>{vocab.def}</div>
                                        </td>
                                        <td>{vocab.topic}</td>
                                        <td><span className={`badge ${vocab.levelColor}`}>{vocab.level}</span></td>
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
                <div className="modal modal-lg">
                    <div className="modal-header">
                        <h3 className="modal-title">Thêm Từ vựng mới</h3>
                        <p className="modal-description">Điền thông tin từ vựng và ví dụ minh họa</p>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Thuật ngữ *</label>
                            <input type="text" className="form-input-simple" placeholder="VD: API" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Định nghĩa *</label>
                            <textarea className="form-textarea" placeholder="Giải thích ý nghĩa của thuật ngữ..."></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Chủ đề</label>
                                <input type="text" className="form-input-simple" placeholder="VD: Web Development" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Cấp độ</label>
                                <select className="form-select" defaultValue="Beginner">
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Ví dụ</label>
                            <textarea className="form-textarea" placeholder="Các ví dụ sử dụng thuật ngữ..."></textarea>
                        </div>
                        <div className="generate-btn">
                            <button className="btn btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
                                Tự động sinh câu hỏi từ từ vựng này
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={closeModal}>Hủy</button>
                        <button className="btn btn-primary" onClick={closeModal}>Thêm</button>
                    </div>
                </div>
            </div>

            {/* Modal Edit (Rút gọn) */}
            <div className={`modal-overlay ${activeModal === 'edit' ? 'active' : ''}`}>
                <div className="modal modal-lg">
                    <div className="modal-header">
                        <h3 className="modal-title">Chỉnh sửa Từ vựng</h3>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Thuật ngữ *</label>
                            <input type="text" className="form-input-simple" defaultValue="API" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Định nghĩa *</label>
                            <textarea className="form-textarea" defaultValue="Application Programming Interface - Giao diện lập trình ứng dụng"></textarea>
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
                        <h3 className="modal-title">Import Từ vựng</h3>
                        <p className="modal-description">Tải lên file Excel hoặc JSON chứa danh sách từ vựng</p>
                    </div>
                    <div className="modal-body">
                        <div className="upload-zone">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                            <p className="upload-text">Kéo thả file hoặc click để chọn</p>
                            <p className="upload-hint">Hỗ trợ: .xlsx, .csv, .json (Tối đa 10MB)</p>
                            <input type="file" accept=".xlsx,.csv,.json" style={{ marginTop: '1rem' }} />
                        </div>
                        <div className="info-box">
                            <p className="info-box-title">Định dạng file mẫu:</p>
                            <code>{'{ "term": "API", "definition": "...", "topic": "...", "level": "...", "examples": "..." }'}</code>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={closeModal}>Hủy</button>
                        <button className="btn btn-primary" onClick={closeModal}>Tải lên</button>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}