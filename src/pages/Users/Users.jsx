// pages/admin/users.jsx (hoặc đúng path file Users của bạn)

import React, { useEffect, useMemo, useState } from 'react';
import api from '../../utils/axios';
import Toast from '../../components/common/Toast';

const AvatarCircle = ({ name, avatarURL, bg = '#3b82f6', size = 36, className = '' }) => {
  const [imgOk, setImgOk] = useState(Boolean(avatarURL));
  const letter = String(name || 'U').charAt(0).toUpperCase();

  useEffect(() => {
    setImgOk(Boolean(avatarURL));
  }, [avatarURL]);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bg,
        flexShrink: 0,
      }}
      title={name || 'User'}
    >
      {imgOk ? (
        <img
          src={avatarURL}
          alt={name || 'avatar'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
          onError={() => setImgOk(false)}
        />
      ) : (
        <span style={{ color: '#fff', fontWeight: 600 }}>{letter}</span>
      )}
    </div>
  );
};

export default function Users() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
  const showToast = (message, type = 'error') => setToast({ show: true, message, type });

  // Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusDraft, setStatusDraft] = useState('ACTIVE');
  const [isSaving, setIsSaving] = useState(false);

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLeaders, setIsLoadingLeaders] = useState(true);

  // Leaderboards
  const [leaderboards, setLeaderboards] = useState({
    topRank: [],
    topXP: [],
    topTask: [],
    topSpirit: [],
  });

  // Users list + pagination
  const [miniStats, setMiniStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    highLevelUsers: 0,
  });

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  // Search
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // ===== Helpers =====
  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('vi-VN');
  };

  const calcLevelFallback = (xp) => Math.floor(Number(xp || 0) / 100) + 1;

  const badge = (status) => {
    const s = String(status || '').toUpperCase();
    if (s === 'ACTIVE') return <span className="badge badge-green">Hoạt động</span>;
    if (s === 'BANNED') return <span className="badge badge-red">Bị cấm</span>;
    return <span className="badge">{s}</span>;
  };

  // ===== API calls =====
  const fetchLeaderboards = async () => {
    setIsLoadingLeaders(true);
    try {
      const res = await api.get('admin/users/leaderboards');
      setLeaderboards({
        topRank: res.data?.topRank || [],
        topXP: res.data?.topXP || [],
        topTask: res.data?.topTask || [],
        topSpirit: res.data?.topSpirit || [],
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể tải Leaderboards.';
      showToast(msg, 'error');
    } finally {
      setIsLoadingLeaders(false);
    }
  };

  const fetchUsers = async ({ page, limit, q }) => {
    setIsLoading(true);
    try {
      const res = await api.get('admin/users', {
        params: {
          page,
          limit,
          search: q || '',
        },
      });

      setMiniStats(res.data?.miniStats || miniStats);
      setPagination(res.data?.pagination || pagination);
      setUsers(res.data?.users || []);
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể tải danh sách người dùng.';
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // ===== Initial load =====
  useEffect(() => {
    fetchLeaderboards();
    fetchUsers({ page: 1, limit: pagination.limit, q: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== Search debounce =====
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      fetchUsers({ page: 1, limit: pagination.limit, q: searchInput });
    }, 450);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // ===== Pagination controls =====
  const goToPage = (p) => {
    const next = Math.max(1, Math.min(p, pagination.totalPages || 1));
    fetchUsers({ page: next, limit: pagination.limit, q: search });
  };

  const changeLimit = (newLimit) => {
    fetchUsers({ page: 1, limit: newLimit, q: search });
  };

  // ===== Open modal =====
  const openEditModal = (u) => {
    setSelectedUser(u);
    setStatusDraft(String(u?.status || 'ACTIVE').toUpperCase());
    setIsEditModalOpen(true);
  };

  // ===== Save status =====
  const saveStatus = async () => {
    if (!selectedUser?.id) return;

    const nextStatus = String(statusDraft).toUpperCase();
    if (!['ACTIVE', 'BANNED'].includes(nextStatus)) {
      showToast('Trạng thái không hợp lệ.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await api.put(`admin/users/${selectedUser.id}/status`, { status: nextStatus });
      showToast('Cập nhật trạng thái thành công!', 'success');
      setIsEditModalOpen(false);

      await fetchUsers({ page: pagination.page, limit: pagination.limit, q: search });
      await fetchLeaderboards();
    } catch (err) {
      const msg = err.response?.data?.message || 'Cập nhật trạng thái thất bại.';
      showToast(msg, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const { topRank = [], topXP = [], topTask = [], topSpirit = [] } = leaderboards;

  const pageInfo = useMemo(() => {
    const total = pagination.total || 0;
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const totalPages = pagination.totalPages || 1;

    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);

    return { total, page, limit, totalPages, from, to };
  }, [pagination]);

  return (
    <>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* Bảng xếp hạng */}
      <div className="leaderboard-grid">
        {/* Top Rank */}
        <div className="leaderboard-card">
          <div className="leaderboard-header">
            <span className="leaderboard-icon leaderboard-icon-rank"></span>
            <span className="leaderboard-title">Top Level Cao Nhất</span>
          </div>

          <div className="leaderboard-list">
            {isLoadingLeaders ? (
              <p style={{ color: '#717182', padding: 12 }}>Đang tải...</p>
            ) : (
              topRank.map((u, index) => (
                <div className="leaderboard-item" key={`rank-${index}`}>
                  <div className={`leaderboard-rank rank-${index + 1}`}>{index + 1}</div>

                  <AvatarCircle
                    name={u.name}
                    avatarURL={u.avatarURL}
                    bg="#3b82f6"
                    size={34}
                    className="leaderboard-avatar"
                  />

                  <div className="leaderboard-info">
                    <span className="leaderboard-name">{u.name}</span>
                  </div>

                  <span
                    className="leaderboard-value value-xp"
                    style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}
                  >
                    {u.value}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top XP */}
        <div className="leaderboard-card">
          <div className="leaderboard-header">
            <span className="leaderboard-icon leaderboard-icon-xp"></span>
            <span className="leaderboard-title">Top XP Cao Nhất</span>
          </div>

          <div className="leaderboard-list">
            {isLoadingLeaders ? (
              <p style={{ color: '#717182', padding: 12 }}>Đang tải...</p>
            ) : (
              topXP.map((u, index) => (
                <div className="leaderboard-item" key={`xp-${index}`}>
                  <div className={`leaderboard-rank rank-${index + 1}`}>{index + 1}</div>

                  <AvatarCircle
                    name={u.name}
                    avatarURL={u.avatarURL}
                    bg="#22c55e"
                    size={34}
                    className="leaderboard-avatar"
                  />

                  <div className="leaderboard-info">
                    <span className="leaderboard-name">{u.name}</span>
                  </div>

                  <span className="leaderboard-value value-xp">{u.value}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Tasks */}
        <div className="leaderboard-card">
          <div className="leaderboard-header">
            <span className="leaderboard-icon leaderboard-icon-task"></span>
            <span className="leaderboard-title">Top Làm Nhiều Nhất</span>
          </div>

          <div className="leaderboard-list">
            {isLoadingLeaders ? (
              <p style={{ color: '#717182', padding: 12 }}>Đang tải...</p>
            ) : (
              topTask.map((u, index) => (
                <div className="leaderboard-item" key={`task-${index}`}>
                  <div className={`leaderboard-rank rank-${index + 1}`}>{index + 1}</div>

                  <AvatarCircle
                    name={u.name}
                    avatarURL={u.avatarURL}
                    bg="#f59e0b"
                    size={34}
                    className="leaderboard-avatar"
                  />

                  <div className="leaderboard-info">
                    <span className="leaderboard-name">{u.name}</span>
                  </div>

                  <span className="leaderboard-value value-task">{u.value}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Streak */}
        <div className="leaderboard-card">
          <div className="leaderboard-header">
            <span className="leaderboard-icon leaderboard-icon-spirit"></span>
            <span className="leaderboard-title">Top Streak Cao Nhất</span>
          </div>

          <div className="leaderboard-list">
            {isLoadingLeaders ? (
              <p style={{ color: '#717182', padding: 12 }}>Đang tải...</p>
            ) : (
              topSpirit.map((u, index) => (
                <div className="leaderboard-item" key={`spirit-${index}`}>
                  <div className={`leaderboard-rank rank-${index + 1}`}>{index + 1}</div>

                  <AvatarCircle
                    name={u.name}
                    avatarURL={u.avatarURL}
                    bg="#ef4444"
                    size={34}
                    className="leaderboard-avatar"
                  />

                  <div className="leaderboard-info">
                    <span className="leaderboard-name">{u.name}</span>
                  </div>

                  <span className="leaderboard-value value-spirit">{u.value}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header card-header-flex">
          <h2 className="card-title">Quản lý Người dùng</h2>

          <div className="mini-stats">
            <div className="mini-stat blue">
              <p className="mini-stat-value blue">{miniStats.totalUsers}</p>
              <p className="mini-stat-label">Tổng user</p>
            </div>
            <div className="mini-stat green">
              <p className="mini-stat-value green">{miniStats.activeUsers}</p>
              <p className="mini-stat-label">Hoạt động</p>
            </div>
            <div className="mini-stat red">
              <p className="mini-stat-value red">{miniStats.bannedUsers}</p>
              <p className="mini-stat-label">Bị cấm</p>
            </div>
            <div className="mini-stat purple">
              <p className="mini-stat-value purple">{miniStats.highLevelUsers || 0}</p>
              <p className="mini-stat-label">Level 50+</p>
            </div>
          </div>
        </div>

        <div className="card-content">
          {/* Thanh điều khiển */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Search bên trái */}
            <div className="search-wrapper" style={{ flex: 1, minWidth: '300px', marginBottom: 0 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm người dùng..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            {/* Controls bên phải */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>Số dòng:</span>
                <select
                  className="form-select"
                  style={{ width: '70px', padding: '4px 8px' }}
                  value={pageInfo.limit}
                  onChange={(e) => changeLimit(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <button
                className="btn btn-outline btn-sm"
                style={{ whiteSpace: 'nowrap' }}
                onClick={() => fetchUsers({ page: pageInfo.page, limit: pageInfo.limit, q: search })}
                disabled={isLoading}
              >
                {isLoading ? '...' : 'Tải lại'}
              </button>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Email</th>
                  <th>Level</th>
                  <th>XP</th>
                  <th>Streak</th>
                  <th>Quiz đã làm</th>
                  <th>Ngày tham gia</th>
                  <th style={{ textAlign: 'center' }}>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={9} style={{ padding: 16, textAlign: 'center' }}>
                      Đang tải...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: 16, textAlign: 'center' }}>
                      Không có dữ liệu.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="user-cell">
                          <AvatarCircle name={u.name} avatarURL={u.avatarURL} bg="#3b82f6" size={36} />
                          <span style={{ fontWeight: 500 }}>{u.name}</span>
                        </div>
                      </td>

                      <td>{u.email}</td>

                      <td>
                        <span
                          className="leaderboard-value"
                          style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}
                        >
                          Level {u.level ?? calcLevelFallback(u.xp)}
                        </span>
                      </td>

                      <td>{Number(u.xp || 0).toLocaleString('vi-VN')}</td>
                      <td>
                        <span className="spirit-value">{u.streak ?? 0}</span>
                      </td>
                      <td>
                        <span className="task-value">{u.quizCount ?? 0}</span>
                      </td>
                      <td>{formatDate(u.createdAt)}</td>

                      <td style={{ textAlign: 'center' }}>{badge(u.status)}</td>

                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => openEditModal(u)}>
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ display: 'flex' }}>
              <p style={{ color: '#717182', fontSize: '14px' }}>
                Trang {pageInfo.page} / {pageInfo.totalPages}
              </p>

              <div style={{ marginLeft: 15, fontSize: '14px', color: '#64748b', whiteSpace: 'nowrap' }}>
                {isLoading ? 'Đang tải...' : `Hiển thị ${pageInfo.from}-${pageInfo.to} / ${pageInfo.total}`}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => goToPage(pageInfo.page - 1)}
                disabled={isLoading || pageInfo.page <= 1}
              >
                Trước
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => goToPage(pageInfo.page + 1)}
                disabled={isLoading || pageInfo.page >= pageInfo.totalPages}
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${isEditModalOpen ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-header">
            <h3 className="modal-title">Cập nhật Trạng thái</h3>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Tên</label>
              <input
                type="text"
                className="form-input-simple"
                value={selectedUser?.name || ''}
                disabled
                style={{ backgroundColor: '#f3f4f6' }}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input-simple"
                value={selectedUser?.email || ''}
                disabled
                style={{ backgroundColor: '#f3f4f6' }}
                readOnly
              />
            </div>

            <div
              className="form-group"
              style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}
            >
              <label className="form-label" style={{ fontWeight: 600 }}>
                Trạng thái hoạt động
              </label>
              <select
                className="form-select"
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value)}
                style={{ borderColor: 'var(--primary)', borderWidth: '2px' }}
              >
                <option value="ACTIVE">Hoạt động (Active)</option>
                <option value="BANNED">Cấm (Banned)</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setIsEditModalOpen(false)} disabled={isSaving}>
              Hủy
            </button>
            <button className="btn btn-primary" onClick={saveStatus} disabled={isSaving}>
              {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}