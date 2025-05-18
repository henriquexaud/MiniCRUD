import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Cadastro from "./pages/Register";
import List from "./pages/List";
import "./App.css";
import { useMediaQuery } from "react-responsive";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMd = useMediaQuery({ minWidth: 768 });

  return (
    <Router>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <Sidebar isOpen={sidebarOpen} />

        <div
          style={{
            marginLeft: sidebarOpen ? (isMd ? 180 : 100) : 0,
            transition: "margin-left 0.3s ease",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main
            style={{
              overflowY: "auto",
              padding: "0rem",
              marginTop: 80,
            }}
          >
            <Routes>
              <Route path="/" element={<Cadastro />} />
              <Route path="/list" element={<List />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
