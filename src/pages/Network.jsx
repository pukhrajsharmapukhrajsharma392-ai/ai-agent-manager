import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Network = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // Generate random nodes orbiting a center
    const newNodes = Array.from({ length: 40 }).map((_, i) => {
      const angle = (i / 40) * Math.PI * 2;
      const radius = 100 + Math.random() * 150;
      return {
        id: i,
        x: 200 + Math.cos(angle) * radius,
        y: 200 + Math.sin(angle) * radius,
        size: Math.random() * 6 + 2,
        color: Math.random() > 0.8 ? '#FF3D54' : '#00D9FF'
      };
    });
    setNodes(newNodes);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 h-full flex flex-col"
    >
      <div className="mb-6 flex justify-between items-center bg-black/40 p-4 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,217,255,0.1)]">
        <div>
          <h2 className="text-xl font-bold font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]">AGENT_TOPOLOGY</h2>
          <p className="text-sm text-cyan-600/70 font-mono">LIVE_NODE_MAPPING</p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]"></span> STANDARD_NODE</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#FF3D54] shadow-[0_0_10px_#FF3D54]"></span> CRITICAL_NODE</div>
        </div>
      </div>

      <div className="flex-1 bg-black/60 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center perspective-[1000px]">
        {/* Deep background grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'rotateX(60deg) scale(2)',
          transformOrigin: 'bottom',
          opacity: 0.5
        }} />

        <svg viewBox="0 0 400 400" className="w-full h-full max-w-3xl drop-shadow-[0_0_15px_rgba(0,217,255,0.3)] z-10" style={{ transformStyle: 'preserve-3d' }}>
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Lines */}
          {nodes.map((node, i) => (
            <motion.line
              key={`line-${i}`}
              x1="200" y1="200"
              x2={node.x} y2={node.y}
              stroke={node.color}
              strokeWidth="0.5"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.05 }}
            />
          ))}

          {/* Central Master Node */}
          <motion.circle 
            cx="200" cy="200" r="40" fill="url(#centerGlow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <circle cx="200" cy="200" r="15" fill="#00D9FF" className="shadow-[0_0_20px_#00D9FF]" />
          <text x="200" y="205" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">CORE</text>

          {/* Orbiting Nodes */}
          {nodes.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.x} cy={node.y} r={node.size}
              fill={node.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 2 }}
              style={{ filter: `drop-shadow(0 0 5px ${node.color})` }}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
};

export default Network;
