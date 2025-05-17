import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Cadastro from "./pages/Register";
import Crud from "./pages/Crud";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Sidebar isOpen={sidebarOpen} />

        <div
          className="flex-grow-1"
          style={{
            marginLeft: sidebarOpen ? 160 : 0,
            transition: "margin-left 0.3s ease",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0rem",
              marginTop: 80,
            }}
          >
            <Routes>
              <Route path="/" element={<Cadastro />} />
              <Route path="/crud" element={<Crud />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
