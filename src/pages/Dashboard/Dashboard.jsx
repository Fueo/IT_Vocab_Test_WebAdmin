import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import Toast from "../../components/common/Toast";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "error" });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/dashboard/stats");

      setStats(response.data.stats);
      setActivities(response.data.recentActivities);
    } catch (err) {
      console.error("Fetch dashboard error:", err);
      setToast({
        show: true,
        message: err.response?.data?.message || "Không thể tải dữ liệu thống kê",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* 4 Thẻ Thống Kê */}
      <div className="stats-grid">
        {/* Người dùng */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon cyan">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="stat-change">+{stats?.newUsersThisMonth || 0} tháng này</span>
          </div>
          <h3 className="stat-value">{isLoading ? "..." : stats?.totalUsers?.toLocaleString()}</h3>
          <p className="stat-label">Tổng người dùng</p>
        </div>

        {/* Từ vựng */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon green">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
          </div>
          <h3 className="stat-value">{isLoading ? "..." : stats?.totalWords?.toLocaleString()}</h3>
          <p className="stat-label">Tổng từ vựng</p>
        </div>

        {/* Câu hỏi */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
          </div>
          <h3 className="stat-value">{isLoading ? "..." : stats?.totalQuestions?.toLocaleString()}</h3>
          <p className="stat-label">Tổng câu hỏi</p>
        </div>

        {/* Góp ý */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>
          <h3 className="stat-value">{isLoading ? "..." : stats?.pendingFeedbacks}</h3>
          <p className="stat-label">Góp ý chưa xử lý</p>
        </div>
      </div>

      {/* Hoạt động gần đây */}
      <div className="card" style={{ marginTop: "2rem" }}>
        <div className="card-header">
          <h2 className="card-title">Hoạt động gần đây</h2>
        </div>

        <div className="card-content">
          <div className="activity-list">
            {isLoading ? (
              <p style={{ textAlign: "center", padding: "20px" }}>Đang tải hoạt động...</p>
            ) : activities?.length > 0 ? (
              activities.map((activity) => (
                <div className="activity-item" key={activity.id ?? activity.time ?? Math.random()}>
                  <div
                    className="activity-dot"
                    style={{ background: activity.xpEarned > 0 ? "#22c55e" : "#3b82f6" }}
                  />
                  <div className="activity-content">
                    <p className="activity-action">
                      {activity.action}
                      {activity.xpEarned > 0 && (
                        <strong style={{ color: "#22c55e" }}> (+{activity.xpEarned} XP)</strong>
                      )}
                    </p>
                    <p className="activity-time">{formatTime(activity.time)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", padding: "20px" }}>Chưa có hoạt động nào gần đây.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}