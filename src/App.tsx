import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FormdataPage from "./pages/formdata";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Login from "./pages/Login";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("admin-auth") === "true");

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    setIsAuth(false);
  };

  return (
    <Router>
      <Routes>
        {/* Login route – accessible only if not authenticated */}
        {!isAuth && (
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        )}

        {/* Protected routes */}
        {isAuth ? (
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
                <Sidebar />
                <div className="flex-1">
                  <Header onLogout={handleLogout} />
                  <main className="p-4">
                    <Routes>
                      <Route path="/contacts" element={<FormdataPage />} />
                      <Route path="*" element={<Navigate to="/contacts" />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        ) : (
          // If not authenticated, redirect any path to login
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
