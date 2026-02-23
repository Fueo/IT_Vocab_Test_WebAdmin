import React, { useState } from 'react';

export default function Questions() {
    const [activeModal, setActiveModal] = useState(null);
    
    // State để quản lý loại câu hỏi đang được chọn trong form thêm mới
    const [questionType, setQuestionType] = useState('multiple-choice');

    const mockQuestions = [
        { id: 1, text: "API là viết tắt của từ gì?", type: "Trắc nghiệm", topic: "Web Development", difficulty: "Beginner", diffColor: "badge-green" },
        { id: 2, text: "React là một framework hay thư viện?", type: "Điền từ", topic: "Frontend", difficulty: "Intermediate", diffColor: "badge-yellow" },
        { id: 3, text: "JavaScript là ngôn ngữ biên dịch (compiled language).", type: "Đúng/Sai", topic: "Programming Core", difficulty: "Beginner", diffColor: "badge-green" },
        { id: 4, text: "Giải thích cơ chế Event Loop trong Node.js", type: "Tự luận", topic: "Backend", difficulty: "Advanced", diffColor: "badge-red" },
    ];

    const closeModal = () => setActiveModal(null);

    return (
        <>
            <div className="card">
                <div className="card-header card-header-flex">
                    <h2 className="card-title">Quản lý Câu hỏi</h2>
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
                    <div className="filters-row">
                        <div className="search-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <input type="text" className="search-input" placeholder="Tìm kiếm câu hỏi..." />
                        </div>
                        <select className="filter-select" defaultValue="all">
                            <option value="all">Tất cả chủ đề</option>
                            <option value="web-dev">Web Development</option>
                            <option value="frontend">Frontend</option>
                        </select>
                    </div>
                    
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Câu hỏi</th>
                                    <th>Loại</th>
                                    <th>Chủ đề</th>
                                    <th>Độ khó</th>
                                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockQuestions.map((q) => (
                                    <tr key={q.id}>
                                        <td>
                                            <div className="truncate" style={{ maxWidth: '350px', fontWeight: 500 }}>{q.text}</div>
                                        </td>
                                        <td>{q.type}</td>
                                        <td>{q.topic}</td>
                                        <td><span className={`badge ${q.diffColor}`}>{q.difficulty}</span></td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn btn-outline btn-sm" onClick={() => setActiveModal('edit')}>Sửa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                         <p className="table-count">Hiển thị 4 trên 4 kết quả</p>
                    </div>
                </div>
            </div>

            {/* Modal Thêm Mới */}
            <div className={`modal-overlay ${activeModal === 'add' ? 'active' : ''}`}>
                <div className="modal modal-lg">
                    <div className="modal-header">
                        <h3 className="modal-title">Thêm Câu hỏi mới</h3>
                        <p className="modal-description">Tạo câu hỏi để kiểm tra kiến thức người dùng</p>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Câu hỏi *</label>
                            <textarea className="form-textarea" placeholder="Nhập câu hỏi..."></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Loại câu hỏi</label>
                                <select 
                                    className="form-select" 
                                    value={questionType}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                >
                                    <option value="multiple-choice">Trắc nghiệm</option>
                                    <option value="true-false">Đúng/Sai</option>
                                    <option value="fill-blank">Điền từ</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Độ khó</label>
                                <select className="form-select" defaultValue="Beginner">
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Chủ đề</label>
                            <input type="text" className="form-input-simple" placeholder="VD: Web Development" />
                        </div>

                        {/* Logic hiển thị các trường nhập liệu tùy theo loại câu hỏi */}
                        {questionType === 'multiple-choice' && (
                            <div className="form-group">
                                <label className="form-label">Các lựa chọn *</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <input type="text" className="form-input-simple" placeholder="Lựa chọn 1 (Đáp án đúng)" />
                                    <input type="text" className="form-input-simple" placeholder="Lựa chọn 2" />
                                    <input type="text" className="form-input-simple" placeholder="Lựa chọn 3" />
                                    <input type="text" className="form-input-simple" placeholder="Lựa chọn 4" />
                                </div>
                            </div>
                        )}

                        {questionType === 'true-false' && (
                            <div className="form-group">
                                <label className="form-label">Đáp án đúng *</label>
                                <div className="radio-group">
                                    <div className="radio-item">
                                        <input type="radio" name="trueFalse" id="true" value="True" />
                                        <label htmlFor="true">Đúng (True)</label>
                                    </div>
                                    <div className="radio-item">
                                        <input type="radio" name="trueFalse" id="false" value="False" />
                                        <label htmlFor="false">Sai (False)</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {questionType === 'fill-blank' && (
                            <div className="form-group">
                                <label className="form-label">Đáp án đúng *</label>
                                <input type="text" className="form-input-simple" placeholder="Nhập đáp án chính xác..." />
                            </div>
                        )}

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={closeModal}>Hủy</button>
                        <button className="btn btn-primary" onClick={closeModal}>Thêm</button>
                    </div>
                </div>
            </div>


        </>
    );
}