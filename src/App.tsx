import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FormdataPage from "./pages/formdata";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-4">
            <Routes>
              
              <Route path="/contacts" element={<FormdataPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
