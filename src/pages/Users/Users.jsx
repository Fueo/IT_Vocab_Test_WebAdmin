import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout'; // Đảm bảo đường dẫn đúng

export default function Users() {
    // State quản lý việc mở/đóng modal chỉnh sửa
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Dữ liệu mẫu cho bảng xếp hạng
    const mockRankLeaderboard = [
        { name: "John Doe", value: "Platinum", badgeClass: "badge-platinum" },
        { name: "Jane Smith", value: "Gold", badgeClass: "badge-gold" },
        { name: "Alice Brown", value: "Silver", badgeClass: "badge-silver" },
    ];

    const mockXpLeaderboard = [
        { name: "John Doe", value: "8,500 XP" },
        { name: "Mike Johnson", value: "7,200 XP" },
        { name: "Jane Smith", value: "6,900 XP" },
    ];

    const mockTaskLeaderboard = [
        { name: "Alice Brown", value: "150 Tasks" },
        { name: "Bob Lee", value: "142 Tasks" },
        { name: "John Doe", value: "120 Tasks" },
    ];

    const mockSpiritLeaderboard = [
        { name: "Jane Smith", value: "30 Days" },
        { name: "John Doe", value: "28 Days" },
        { name: "Mike Johnson", value: "25 Days" },
    ];

    return (
        <AdminLayout title="Quản lý Người dùng" activePath="/users">

            {/* 4 Bảng xếp hạng thu nhỏ */}
            <div className="leaderboard-grid">

                {/* Top Rank */}
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <span className="leaderboard-icon leaderboard-icon-rank"></span>
                        <span className="leaderboard-title">Top Rank Cao Nhất</span>
                    </div>
                    <div className="leaderboard-list">
                        {mockRankLeaderboard.map((user, index) => (
                            <div className="leaderboard-item" key={`rank-${index}`}>
                                <div className={`leaderboard-rank rank-${index + 1}`}>{index + 1}</div>
                                <div className="leaderboard-avatar" style={{ background: '#3b82f6' }}>{user.name.charAt(0)}</div>
                                <div className="leaderboard-info">
                                    <span className="leaderboard-name">{user.name}</span>
                                </div>
                                <span className={`leaderboard-badge ${user.badgeClass}`}>{user.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top XP */}
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <span className="leaderboard-icon leaderboard-icon-xp"></span>
                        <span className="leaderboard-title">Top XP Cao Nhất</span>
                    </div>
                    <div className="leaderboard-list">
                        {mockXpLeaderboard.map((user, index) => (
                            <div className="leaderboard-item" key={`xp-${index}`}>
                                <div className={`leaderboard-rank rank-${index + 1}`}>{index + 1}</div>
                                <div className="leaderboard-avatar" style={{ background: '#22c55e' }}>{user.name.charAt(0)}</div>
                                <div className="leaderboard-info">
                                    <span className="leaderboard-name">{user.name}</span>
                                </div>
                                <span className="leaderboard-value value-xp">{user.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Task */}
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <span className="leaderboard-icon leaderboard-icon-task"></span>
                        <span className="leaderboard-title">Top Làm Nhiều Nhất</span>
                    </div>
                    <div className="leaderboard-list">
                        {mockTaskLeaderboard.map((user, index) => (
                            <div className="leaderboard-item" key={`task-${index}`}>
                                <div className={`leaderboard-rank rank-${index + 1}`}>{index + 1}</div>
                                <div className="leaderboard-avatar" style={{ background: '#f59e0b' }}>{user.name.charAt(0)}</div>
                                <div className="leaderboard-info">
                                    <span className="leaderboard-name">{user.name}</span>
                                </div>
                                <span className="leaderboard-value value-task">{user.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Spirit */}
                <div className="leaderboard-card">
                    <div className="leaderboard-header">
                        <span className="leaderboard-icon leaderboard-icon-spirit"></span>
                        <span className="leaderboard-title">Top Spirit Cao Nhất</span>
                    </div>
                    <div className="leaderboard-list">
                        {mockSpiritLeaderboard.map((user, index) => (
                            <div className="leaderboard-item" key={`spirit-${index}`}>
                                <div className={`leaderboard-rank rank-${index + 1}`}>{index + 1}</div>
                                <div className="leaderboard-avatar" style={{ background: '#ef4444' }}>{user.name.charAt(0)}</div>
                                <div className="leaderboard-info">
                                    <span className="leaderboard-name">{user.name}</span>
                                </div>
                                <span className="leaderboard-value value-spirit">{user.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bảng Danh sách Người Dùng */}
            <div className="card">
                <div className="card-header card-header-flex">
                    <h2 className="card-title">Quản lý Người dùng</h2>
                    <div className="mini-stats">
                        <div className="mini-stat blue">
                            <p className="mini-stat-value blue">5</p>
                            <p className="mini-stat-label">Tổng user</p>
                        </div>
                        <div class="mini-stat green">
                            <p class="mini-stat-value green">4</p>
                            <p class="mini-stat-label">Hoạt động</p>
                        </div>
                        <div class="mini-stat red">
                            <p class="mini-stat-value red">1</p>
                            <p class="mini-stat-label">Bị cấm</p>
                        </div>
                        <div class="mini-stat purple">
                            <p class="mini-stat-value purple">1</p>
                            <p class="mini-stat-label">Platinum</p>
                        </div>
                    </div>
                </div>

                <div className="card-content">
                    <div className="search-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input type="text" className="search-input" placeholder="Tìm kiếm người dùng..." />
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Người dùng</th>
                                    <th>Email</th>
                                    <th>Rank</th>
                                    <th>XP</th>
                                    <th>Spirit</th>
                                    <th>Nhiệm vụ</th>
                                    <th>Ngày tham gia</th>
                                    <th style={{ textAlign: 'center' }}>Trạng thái</th>
                                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Dữ liệu người dùng mẫu 1 */}
                                <tr>
                                    <td>
                                        <div className="user-cell">
                                            <div className="avatar" style={{ background: '#3b82f6' }}>N</div>
                                            <span style={{ fontWeight: 500 }}>Nguyễn Văn A</span>
                                        </div>
                                    </td>
                                    <td>nguyenvana@example.com</td>
                                    <td><span className="leaderboard-badge badge-gold">Gold</span></td>
                                    <td>2,450</td>
                                    <td><span className="spirit-value">12</span></td>
                                    <td><span className="task-value">45</span></td>
                                    <td>15/01/2024</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className="badge badge-green">Hoạt động</span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="btn btn-outline btn-sm" onClick={() => setIsEditModalOpen(true)}>Sửa</button>
                                    </td>
                                </tr>

                                {/* Dữ liệu người dùng mẫu 2 */}
                                <tr>
                                    <td>
                                        <div className="user-cell">
                                            <div className="avatar" style={{ background: '#ef4444' }}>T</div>
                                            <span style={{ fontWeight: 500 }}>Trần Thị B</span>
                                        </div>
                                    </td>
                                    <td>tranthib@example.com</td>
                                    <td><span className="leaderboard-badge badge-silver">Silver</span></td>
                                    <td>1,200</td>
                                    <td><span className="spirit-value">5</span></td>
                                    <td><span className="task-value">20</span></td>
                                    <td>10/12/2023</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className="badge badge-red">Bị cấm</span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="btn btn-outline btn-sm" onClick={() => setIsEditModalOpen(true)}>Sửa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <p className="table-count">Hiển thị 2 trên 5 kết quả</p>
                    </div>
                </div>
            </div>

            {/* Modal Chỉnh Sửa */}
            <div className={`modal-overlay ${isEditModalOpen ? 'active' : ''}`}>
                <div className="modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Chỉnh sửa Người dùng</h3>
                        <p className="modal-description">Cập nhật thông tin người dùng</p>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Tên</label>
                            <input type="text" className="form-input-simple" defaultValue="Nguyễn Văn A" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-input-simple" defaultValue="nguyenvana@example.com" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Rank</label>
                            <select className="form-select" defaultValue="Gold">
                                <option value="Bronze">Bronze</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                                <option value="Platinum">Platinum</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">XP</label>
                            <input type="number" className="form-input-simple" defaultValue="2450" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline" onClick={() => setIsEditModalOpen(false)}>Hủy</button>
                        <button className="btn btn-primary" onClick={() => setIsEditModalOpen(false)}>Cập nhật</button>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}