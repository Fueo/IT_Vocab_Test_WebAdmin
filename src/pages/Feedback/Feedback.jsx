import React, { useEffect, useMemo, useState } from 'react';
import api from '../../utils/axios';
import Toast from '../../components/common/Toast';

// ✅ BE schema: open | closed | resolved
const statusLabel = (s) => {
  const v = String(s || '').toLowerCase();
  if (v === 'open') return { text: 'Mới', badge: 'badge badge-blue flex-center' };
  if (v === 'closed') return { text: 'Đang xử lý', badge: 'badge badge-yellow flex-center' };
  if (v === 'resolved') return { text: 'Đã xong', badge: 'badge badge-green flex-center' };
  return { text: v, badge: 'badge flex-center' };
};

// BE của bạn đang có fields: title, reason, content
const typeBadge = (type) => {
  const t = String(type || '').toLowerCase();
  if (t.includes('bug')) return <span className="badge badge-red">Bug Report</span>;
  if (t.includes('feature')) return <span className="badge badge-purple">Feature Request</span>;
  return <span className="badge">General</span>;
};

export default function Feedback() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
  const showToast = (message, type = 'error') => setToast({ show: true, message, type });

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Stats
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });

  // Data + pagination
  const [feedbacks, setFeedbacks] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  // Filters
  const [statusFilter, setStatusFilter] = useState('all'); // all | new | in-progress | completed
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [statusDraft, setStatusDraft] = useState('OPEN'); // OPEN|IN_PROGRESS|RESOLVED

  const fetchFeedbacks = async ({ page, limit, q, status }) => {
    setIsLoading(true);
    try {
      const res = await api.get('admin/feedbacks', {
        params: {
          page,
          limit,
          search: q || '',
          status: status || 'all',
        },
      });

      setStats(res.data?.stats || stats);
      setPagination(res.data?.pagination || pagination);
      setFeedbacks(res.data?.feedbacks || []);
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể tải danh sách góp ý.';
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks({ page: 1, limit: pagination.limit, q: '', status: statusFilter });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      fetchFeedbacks({ page: 1, limit: pagination.limit, q: searchInput, status: statusFilter });
    }, 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // filter status change
  useEffect(() => {
    fetchFeedbacks({ page: 1, limit: pagination.limit, q: search, status: statusFilter });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const pageInfo = useMemo(() => {
    const total = pagination.total || 0;
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const totalPages = pagination.totalPages || 1;
    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);
    return { total, page, limit, totalPages, from, to };
  }, [pagination]);

  const goToPage = (p) => {
    const next = Math.max(1, Math.min(p, pagination.totalPages || 1));
    fetchFeedbacks({ page: next, limit: pagination.limit, q: search, status: statusFilter });
  };

  const changeLimit = (newLimit) => {
    fetchFeedbacks({ page: 1, limit: newLimit, q: search, status: statusFilter });
  };

  const openModal = (fb) => {
    setSelected(fb);

    // ✅ map db status (open|closed|resolved) -> draft enum
    const s = String(fb?.status || '').toLowerCase();
    if (s === 'open') setStatusDraft('OPEN');
    else if (s === 'closed') setStatusDraft('IN_PROGRESS');
    else setStatusDraft('RESOLVED');

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const saveStatus = async () => {
    if (!selected?.id) return;
    const next = String(statusDraft || '').toUpperCase();
    if (!['OPEN', 'IN_PROGRESS', 'RESOLVED'].includes(next)) {
      showToast('Trạng thái không hợp lệ.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await api.put(`admin/feedbacks/${selected.id}/status`, { status: next });
      showToast('Cập nhật trạng thái thành công!', 'success');
      setIsModalOpen(false);

      await fetchFeedbacks({ page: pagination.page, limit: pagination.limit, q: search, status: statusFilter });
    } catch (err) {
      const msg = err.response?.data?.message || 'Cập nhật trạng thái thất bại.';
      showToast(msg, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // helper: lấy user từ BE
  const getUserInfo = (fb) => {
    const u = fb?.user;
    return {
      name: u?.name || 'Ẩn danh',
      email: u?.email || '',
      avatarURL: u?.avatarURL || '',
    };
  };

  return (
    <>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <p className="stat-label">Tổng góp ý</p>
              <h3 className="stat-value">{stats.total}</h3>
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
              <h3 className="stat-value" style={{ color: '#3b82f6' }}>{stats.open}</h3>
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
              <h3 className="stat-value" style={{ color: '#ca8a04' }}>{stats.inProgress}</h3>
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
              <h3 className="stat-value" style={{ color: '#22c55e' }}>{stats.resolved}</h3>
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

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Góp ý & Bảo trì</h2>
        </div>

        <div className="card-content">
          {/* Filters */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginBottom: 12,
            }}
          >
            <div className="search-wrapper" style={{ flex: 1, minWidth: 280, marginBottom: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm góp ý..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="new">Mới</option>
                <option value="in-progress">Đang xử lý</option>
                <option value="completed">Đã xong</option>
              </select>

              <span style={{ fontSize: 14, whiteSpace: 'nowrap', color: '#64748b' }}>Số dòng:</span>
              <select
                className="form-select"
                style={{ width: 80 }}
                value={pageInfo.limit}
                onChange={(e) => changeLimit(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => fetchFeedbacks({ page: pageInfo.page, limit: pageInfo.limit, q: search, status: statusFilter })}
                disabled={isLoading}
                style={{ whiteSpace: 'nowrap' }}
              >
                {isLoading ? '...' : 'Tải lại'}
              </button>
            </div>
          </div>

          <div style={{ color: '#717182', marginBottom: 10 }}>
            {isLoading ? 'Đang tải...' : `Hiển thị ${pageInfo.from}-${pageInfo.to} trên ${pageInfo.total} kết quả`}
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nội dung</th>
                  <th>Người gửi</th>
                  <th>Loại</th>
                  <th>Thời gian</th>
                  <th style={{ textAlign: 'center' }}>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 16, textAlign: 'center' }}>Đang tải...</td>
                  </tr>
                ) : feedbacks.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 16, textAlign: 'center' }}>Không có dữ liệu.</td>
                  </tr>
                ) : (
                  feedbacks.map((f) => {
                    const st = statusLabel(f.status);
                    const u = getUserInfo(f);

                    return (
                      <tr key={f.id}>
                        <td>
                          <div className="truncate" style={{ maxWidth: 420 }}>
                            {f.content}
                          </div>
                        </td>

                        {/* ✅ BE trả về f.user */}
                        <td>
                          <div>
                            <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>{u.name}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{u.email}</p>
                          </div>
                        </td>

                        <td>{typeBadge(f.reason || f.type)}</td>

                        <td>{new Date(f.createdAt).toLocaleString('vi-VN')}</td>

                        <td style={{ textAlign: 'center' }}>
                          <span className={st.badge} style={{ justifyContent: 'center' }}>
                            {st.text}
                          </span>
                        </td>

                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-outline btn-sm" onClick={() => openModal(f)}>
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <p style={{ margin: 0, color: '#717182' }}>
              Trang {pageInfo.page}/{pageInfo.totalPages}
            </p>

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

      {/* Modal Chi tiết + update status (UI đẹp hơn) */}
      <div
        className={`modal-overlay ${isModalOpen ? 'active' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSaving) closeModal();
        }}
      >
        <div
          className="modal"
          style={{
            width: 'min(720px, 94vw)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          }}
        >
          {/* Header */}
          <div
            className="modal-header"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 12,
              padding: '16px 18px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--card)',
            }}
          >
            <div>
              <h3 className="modal-title" style={{ margin: 0, fontSize: 18, lineHeight: 1.2 }}>
                Chi tiết Góp ý
              </h3>
              <p className="modal-description" style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted-foreground)' }}>
                ID:{' '}
                <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
                  {selected?.id || ''}
                </span>
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={closeModal}
              disabled={isSaving}
              aria-label="Đóng"
              style={{
                width: 36,
                height: 36,
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body" style={{ padding: 18 }}>
            {/* Nội dung góp ý */}
            <div
              style={{
                border: '1px solid var(--border)',
                background: 'var(--muted, rgba(148,163,184,0.08))',
                borderRadius: 12,
                padding: 14,
                marginBottom: 14,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Loại:</span>
                  {typeBadge(selected?.reason || selected?.type)}
                </div>

                {(() => {
                  const st = statusLabel(selected?.status);
                  return (
                    <span className={st.badge} style={{ justifyContent: 'center' }}>
                      {st.text}
                    </span>
                  );
                })()}
              </div>

              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 6 }}>Nội dung</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {selected?.content || ''}
                </div>
              </div>
            </div>

            {/* Grid info */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: 14,
                  background: 'var(--card)',
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 8 }}>Người gửi</div>

                {/* ✅ dùng selected.user */}
                <div style={{ fontWeight: 600, fontSize: 14 }}>{selected?.user?.name || 'Ẩn danh'}</div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 4 }}>
                  {selected?.user?.email || ''}
                </div>
              </div>

              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: 14,
                  background: 'var(--card)',
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 8 }}>Thời gian</div>
                <div style={{ fontSize: 14 }}>
                  {selected?.createdAt ? new Date(selected.createdAt).toLocaleString('vi-VN') : ''}
                </div>
              </div>

              {/* Trạng thái (full width) */}
              <div
                style={{
                  gridColumn: '1 / -1',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: 14,
                  background: 'var(--card)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Cập nhật trạng thái</div>
                    <div style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 2 }}>
                      Chọn trạng thái mới rồi bấm <b>Lưu thay đổi</b>
                    </div>
                  </div>

                  <div style={{ minWidth: 240 }}>
                    <select
                      className="form-select"
                      value={statusDraft}
                      onChange={(e) => setStatusDraft(e.target.value)}
                      style={{ borderColor: 'var(--primary)', borderWidth: 2, height: 40 }}
                      disabled={isSaving}
                    >
                      <option value="OPEN">Mới (Open)</option>
                      <option value="IN_PROGRESS">Đang xử lý (In Progress)</option>
                      <option value="RESOLVED">Đã xong (Resolved)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @media (max-width: 640px) {
                .modal-body > div[style*="grid-template-columns: 1fr 1fr"] {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </div>

          {/* Footer */}
          <div
            className="modal-footer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 10,
              padding: '14px 18px',
              borderTop: '1px solid var(--border)',
              background: 'var(--card)',
            }}
          >
            <button className="btn btn-outline" onClick={closeModal} disabled={isSaving}>
              Đóng
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