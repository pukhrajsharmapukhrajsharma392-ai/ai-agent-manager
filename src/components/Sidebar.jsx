import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Radio, Terminal, BarChart3, Hexagon, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const links = [
    { name: 'OVERVIEW', path: '/', icon: <Activity className="w-5 h-5" /> },
    { name: 'AGENTS', path: '/agents', icon: <Users className="w-5 h-5" /> },
    { name: 'NETWORK', path: '/network', icon: <Hexagon className="w-5 h-5" /> },
    { name: 'LOGS', path: '/logs', icon: <Terminal className="w-5 h-5" /> },
    { name: 'ANALYTICS', path: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 h-screen border-r border-red-600/30 bg-black/40 backdrop-blur-md flex flex-col z-50 shadow-[4px_0_24px_rgba(255,61,84,0.15)]">
      <div className="p-6 border-b border-red-600/30">
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Radio className="w-8 h-8 text-red-500 drop-shadow-[0_0_8px_rgba(255,61,84,0.8)]" />
          </motion.div>
          <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-[#FF3D54] to-[#FF1744] drop-shadow-[0_0_10px_rgba(255,61,84,0.5)]">
            YUVA OS
          </h1>
        </div>
        <div className="text-xs font-mono text-red-500/70 tracking-widest">
          SYS.ADMIN // CORE
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                isActive
                  ? 'bg-red-600/20 text-red-400 shadow-[inset_0_0_20px_rgba(255,61,84,0.2),0_0_15px_rgba(255,61,84,0.3)] border border-red-500/50'
                  : 'text-slate-400 hover:text-red-300 hover:bg-red-600/10 border border-transparent hover:border-red-500/30'
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-red-600/30 text-xs font-mono text-slate-500 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span>SYS_STATUS:</span>
          <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]">ONLINE</span>
        </div>
        <div className="flex justify-between items-center">
          <span>LATENCY:</span>
          <span className="text-cyan-400">12ms</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
