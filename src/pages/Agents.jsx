import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShieldAlert, Cpu, MemoryStick as Memory, Clock } from 'lucide-react';

// Pre-generate 600 agents to avoid regenerating on every render
const DEPARTMENTS = ['INFRA', 'FINANCE', 'MARKETING', 'DEVOPS', 'SECURITY', 'ANALYTICS', 'SUPPORT', 'SALES'];
const STATUSES = ['ACTIVE', 'RUNNING', 'IDLE', 'ERROR'];

const generateAgents = () => {
  return Array.from({ length: 600 }).map((_, i) => {
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    return {
      id: `AGT-${String(i + 1).padStart(4, '0')}`,
      name: `SUB_AGENT_${i + 1}`,
      department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
      status: status,
      cpu: (Math.random() * 80 + 10).toFixed(1),
      memory: (Math.random() * 64 + 4).toFixed(1),
      uptime: (Math.random() * 500 + 10).toFixed(1),
      tasks: Math.floor(Math.random() * 1000),
      critical: Math.random() > 0.9,
    };
  });
};

const INITIAL_AGENTS = generateAgents();

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredAgents = useMemo(() => {
    return INITIAL_AGENTS.filter(agent => {
      const matchesSearch = agent.id.includes(searchTerm) || agent.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || agent.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 h-full flex flex-col"
    >
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold font-mono text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] flex items-center gap-3">
            <Cpu className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]" />
            AGENT_REGISTRY
          </h2>
          <p className="text-sm font-mono text-cyan-500/70 mt-1">TOTAL_RECORDS: 600</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="SEARCH_ID_OR_NAME..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/50 border border-cyan-500/30 rounded-lg pl-10 pr-4 py-2 font-mono text-sm text-cyan-100 placeholder-cyan-700 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-all w-64"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-black/50 border border-cyan-500/30 rounded-lg pl-10 pr-4 py-2 font-mono text-sm text-cyan-100 focus:outline-none focus:border-cyan-400 appearance-none cursor-pointer"
            >
              <option value="ALL">STATUS: ALL</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="RUNNING">RUNNING</option>
              <option value="IDLE">IDLE</option>
              <option value="ERROR">ERROR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Agents Table */}
      <div className="flex-1 bg-black/40 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col perspective-[1000px]">
        {/* Table Header */}
        <div className="grid grid-cols-8 gap-4 p-4 border-b border-cyan-500/30 bg-cyan-900/10 font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest shadow-[0_4px_10px_rgba(0,0,0,0.2)] z-10">
          <div className="col-span-1">AGENT_ID</div>
          <div className="col-span-2">NAME / DEPT</div>
          <div className="col-span-1">STATUS</div>
          <div className="col-span-1 flex items-center gap-1"><Cpu className="w-3 h-3"/> CPU</div>
          <div className="col-span-1 flex items-center gap-1"><Memory className="w-3 h-3"/> MEMORY</div>
          <div className="col-span-1 flex items-center gap-1"><Clock className="w-3 h-3"/> UPTIME</div>
          <div className="col-span-1 text-right">TASKS</div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 transform-style-3d">
          {filteredAgents.map((agent, index) => {
            const isError = agent.status === 'ERROR';
            const isActive = agent.status === 'ACTIVE' || agent.status === 'RUNNING';
            
            return (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.5) }}
                key={agent.id}
                className={`grid grid-cols-8 gap-4 px-4 py-3 rounded-lg font-mono text-sm items-center transition-all duration-200 ${
                  isError 
                    ? 'bg-red-900/10 border border-red-500/20 hover:border-red-500/50 hover:bg-red-900/20 shadow-[inset_0_0_10px_rgba(255,61,84,0.05)]' 
                    : 'bg-white/5 border border-transparent hover:border-cyan-500/30 hover:bg-cyan-900/10'
                }`}
              >
                <div className={`col-span-1 ${isError ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                  {agent.id}
                </div>
                
                <div className="col-span-2 flex flex-col">
                  <span className="text-white font-bold flex items-center gap-2">
                    {agent.name}
                    {agent.critical && <ShieldAlert className="w-3 h-3 text-red-500 animate-pulse" />}
                  </span>
                  <span className="text-xs text-slate-500">{agent.department}</span>
                </div>

                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded text-xs font-bold shadow-inner ${
                    agent.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    agent.status === 'RUNNING' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                    agent.status === 'ERROR' ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(255,61,84,0.4)]' :
                    'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                  }`}>
                    {agent.status}
                  </span>
                </div>

                <div className={`col-span-1 ${Number(agent.cpu) > 70 ? 'text-yellow-400' : 'text-slate-300'}`}>
                  {agent.cpu}%
                </div>
                
                <div className={`col-span-1 ${Number(agent.memory) > 50 ? 'text-yellow-400' : 'text-slate-300'}`}>
                  {agent.memory} GB
                </div>

                <div className="col-span-1 text-slate-400">
                  {agent.uptime}h
                </div>

                <div className="col-span-1 text-right font-bold text-cyan-100">
                  {agent.tasks.toLocaleString()}
                </div>
              </motion.div>
            );
          })}
          
          {filteredAgents.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-500 font-mono">
              NO_AGENTS_FOUND_MATCHING_CRITERIA
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Agents;
