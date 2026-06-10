import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [data, setData] = useState({
    cpu: Array.from({ length: 15 }).map((_, i) => ({ name: `T-${15-i}`, value: Math.random() * 100 })),
    memory: Array.from({ length: 15 }).map((_, i) => ({ name: `T-${15-i}`, value: Math.random() * 100 })),
  });

  const pieData = [
    { name: 'INFRA', value: 400 },
    { name: 'FINANCE', value: 300 },
    { name: 'MARKETING', value: 300 },
    { name: 'SECURITY', value: 200 },
  ];
  const COLORS = ['#FF3D54', '#00D9FF', '#34D399', '#FBBF24'];

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        cpu: [...prev.cpu.slice(1), { name: 'NOW', value: Math.random() * 100 }],
        memory: [...prev.memory.slice(1), { name: 'NOW', value: Math.random() * 100 }],
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 h-full flex flex-col gap-6 overflow-y-auto custom-scrollbar"
    >
      <h2 className="text-2xl font-bold font-mono text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        SYSTEM_ANALYTICS
      </h2>

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-[400px]">
        {/* CPU Chart */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-red-500/30 p-6 shadow-[0_10px_30px_rgba(255,61,84,0.1)]">
          <h3 className="text-red-400 font-mono mb-4 text-sm font-bold">CPU_ALLOCATION</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data.cpu}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,61,84,0.1)'}} contentStyle={{ backgroundColor: '#000', border: '1px solid #FF3D54' }} />
              <Bar dataKey="value" fill="#FF3D54" radius={[4, 4, 0, 0]} style={{ filter: 'drop-shadow(0 0 5px #FF3D54)' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Memory Chart */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-6 shadow-[0_10px_30px_rgba(0,217,255,0.1)]">
          <h3 className="text-cyan-400 font-mono mb-4 text-sm font-bold">MEMORY_USAGE</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data.memory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #00D9FF' }} />
              <Line type="stepAfter" dataKey="value" stroke="#00D9FF" strokeWidth={3} dot={false} style={{ filter: 'drop-shadow(0 0 5px #00D9FF)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Distribution */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-emerald-500/30 p-6 shadow-[0_10px_30px_rgba(52,211,153,0.1)] col-span-2 flex items-center">
          <div className="w-1/3">
            <h3 className="text-emerald-400 font-mono mb-4 text-sm font-bold">RESOURCE_DISTRIBUTION</h3>
            <div className="space-y-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length], boxShadow: `0 0 8px ${COLORS[index % COLORS.length]}` }} />
                  {entry.name}: {entry.value} TB
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: `drop-shadow(0 0 5px ${COLORS[index % COLORS.length]})` }} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
