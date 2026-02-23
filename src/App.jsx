import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import đầy đủ các trang
import Login from './pages/Login/Login.jsx'; // Cập nhật đường dẫn import nếu cần
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Vocabulary from './pages/Vocabulary/Vocabulary.jsx';
import Topics from './pages/Topics/Topics.jsx';
import Questions from './pages/Questions/Questions.jsx';
import Users from './pages/Users/Users.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Feedback from './pages/Feedback/Feedback.jsx';

import './assets/css/styles.css';

// ==========================================
// COMPONENT BẢO VỆ ROUTE (PRIVATE ROUTE)
// ==========================================
const PrivateRoute = ({ children }) => {
  // Kiểm tra xem token có tồn tại trong localStorage không
  const isAuthenticated = localStorage.getItem('adminAccessToken');
  
  // Nếu có token => Cho phép render children (các trang Admin)
  // Nếu không => Đá về trang /login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route Public: Bất kỳ ai cũng có thể vào xem */}
        <Route path="/login" element={<Login />} />

        {/* Các Route Private: Phải đăng nhập mới xem được */}
        {/* Bọc các component bên trong thẻ <PrivateRoute> */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/vocabulary" element={<PrivateRoute><Vocabulary /></PrivateRoute>} />
        <Route path="/topics" element={<PrivateRoute><Topics /></PrivateRoute>} />
        <Route path="/questions" element={<PrivateRoute><Questions /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />

        {/* Chuyển hướng mặc định */}
        {/* Nếu đã vào một route linh tinh, cho về login nếu chưa đăng nhập, hoặc dashboard nếu đã đăng nhập */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;