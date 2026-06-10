import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Network from './pages/Network';
import Logs from './pages/Logs';
import Analytics from './pages/Analytics';
import Agents from './pages/Agents';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#0a0a0a] text-slate-100 overflow-hidden relative" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 61, 84, 0.02) 2px, rgba(255, 61, 84, 0.02) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 61, 84, 0.02) 2px, rgba(255, 61, 84, 0.02) 4px)
        `,
      }}>
        {/* Animated neon glow background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 blur-[100px] rounded-full opacity-30" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[100px] rounded-full opacity-20" />
        </div>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10 h-screen overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/network" element={<Network />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
