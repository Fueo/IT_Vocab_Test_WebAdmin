import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Vocabulary from "./pages/Vocabulary/Vocabulary.jsx";
import Topics from "./pages/Topics/Topics.jsx";
import Questions from "./pages/Questions/Questions.jsx";
import Users from "./pages/Users/Users.jsx";
import Inventory from "./pages/Inventory/Inventory.jsx";
import Feedback from "./pages/Feedback/Feedback.jsx";

import AdminLayout from "./components/layout/AdminLayout.jsx"; // chỉnh đúng path
import PrivateRoute from "./components/PrivateRoute.jsx";     // chỉnh đúng path

import "./assets/css/styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Private wrapper */}
        <Route element={<PrivateRoute />}>
          {/* Admin layout wrapper */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/users" element={<Users />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/feedback" element={<Feedback />} />
          </Route>
        </Route>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;