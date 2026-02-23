import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Feedback from './pages/Feedback/Feedback.jsx';
import Users from './pages/Users/Users.jsx';

// Tạm thời comment các component chưa test
// import Sidebar from './components/Sidebar';
// import Users from './pages/Users';
// import Vocabulary from './pages/Vocabulary';
// import Questions from './pages/Questions';
// import Feedback from './pages/Feedback';
// import Inventory from './pages/Inventory';
// import Topics from './pages/Topics';

import './assets/css/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Render trực tiếp Dashboard vì nó đã chứa sẵn AdminLayout và Sidebar */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/users" element={<Users />} />

        {/* Bắt mọi route khác và chuyển hướng về trang dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;