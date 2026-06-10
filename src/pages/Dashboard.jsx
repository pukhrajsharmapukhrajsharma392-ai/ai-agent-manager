import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  // Generate 60 main operators
  const generateOperators = () => {
    const departments = [
      'INFRA', 'FINANCE', 'MARKETING', 'DEVOPS', 'SECURITY', 'ANALYTICS', 'SUPPORT', 'SALES'
    ];
    return Array.from({ length: 60 }).map((_, idx) => ({
      id: idx + 1,
      name: `OP.${String(idx + 1).padStart(2, '0')} ${departments[idx % departments.length]}`,
      status: ['ACTIVE', 'RUNNING', 'IDLE'][Math.floor(Math.random() * 3)],
    }));
  };

  const [operators] = useState(generateOperators());
  const [selectedOperator, setSelectedOperator] = useState(operators[0]);

  // Chart Data
  const generateData = () => {
    return Array.from({ length: 20 }).map((_, i) => ({
      time: i,
      load: Math.floor(Math.random() * 60) + 20 + Math.sin(i * 0.5) * 20,
    }));
  };
  const [chartData, setChartData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => [
        ...prev.slice(1),
        { time: prev[prev.length - 1].time + 1, load: Math.floor(Math.random() * 60) + 20 }
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 grid grid-cols-12 gap-6 h-full perspective-[1000px]"
    >
      {/* LEFT COLUMN: Main Operators */}
      <div className="col-span-3 flex flex-col h-[calc(100vh-4rem)]">
        <div className="border-b-2 border-red-600/50 pb-2 mb-4 shadow-[0_4px_15px_rgba(255,61,84,0.2)]">
          <h2 className="text-sm font-mono font-bold text-red-500 drop-shadow-[0_0_5px_rgba(255,61,84,0.8)]">
            MAIN_OPERATORS
          </h2>
        </div>
        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar perspective-[800px]">
          {operators.slice(0, 10).map((op, idx) => (
            <motion.button
              whileHover={{ scale: 1.02, rotateY: 2, translateZ: 10 }}
              whileTap={{ scale: 0.98 }}
              key={op.id}
              onClick={() => setSelectedOperator(op)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform-style-3d ${
                selectedOperator?.id === op.id
                  ? 'bg-red-600/20 border-red-500 shadow-[0_0_20px_rgba(255,61,84,0.4),inset_0_0_15px_rgba(255,61,84,0.2)] border-2'
                  : 'bg-black/40 border border-red-600/30 hover:border-red-500/60 shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,61,84,0.2)]'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Radio className={`w-4 h-4 ${selectedOperator?.id === op.id ? 'text-red-400 drop-shadow-[0_0_8px_rgba(255,61,84,1)]' : 'text-red-600'}`} />
                <span className="font-mono text-sm text-red-100">{op.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-1 rounded font-bold tracking-wider shadow-inner ${
                  op.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 
                  op.status === 'RUNNING' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 
                  'bg-slate-500/20 text-slate-400 border border-slate-500/50'
                }`}>
                  {op.status}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* MIDDLE & RIGHT COMBINED: 3D Analytics & Visuals */}
      <div className="col-span-9 flex flex-col gap-6">
        {/* Top 3D Glass Panel with Chart */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/30 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 shadow-[0_15px_35px_rgba(255,61,84,0.1),inset_0_0_20px_rgba(255,61,84,0.05)] transform-style-3d relative overflow-hidden"
        >
          {/* Decorative neon lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30" />
          
          <h2 className="text-lg font-mono font-bold text-red-400 mb-6 drop-shadow-[0_0_8px_rgba(255,61,84,0.6)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(255,61,84,1)]" />
            GLOBAL_SYSTEM_LOAD
          </h2>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3D54" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF3D54" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,61,84,0.1)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,61,84,0.5)', borderRadius: '8px', boxShadow: '0 0 15px rgba(255,61,84,0.3)' }}
                  itemStyle={{ color: '#FF3D54', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="load" stroke="#FF3D54" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" style={{ filter: 'drop-shadow(0 0 8px rgba(255,61,84,0.5))' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bottom Stats Grid */}
        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            { label: 'ACTIVE_NODES', value: '4,289', glow: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' },
            { label: 'BANDWIDTH', value: '1.2 PB/s', glow: 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]' },
            { label: 'THREAT_LEVEL', value: 'LOW', glow: 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ translateY: -5, scale: 1.02 }}
              className="bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="text-sm font-mono text-slate-400 mb-2 tracking-widest">{stat.label}</div>
              <div className={`text-3xl font-black ${stat.glow}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
