import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const bottomRef = useRef(null);

  const generateLog = () => {
    const processes = ['MASTER_ROUTER', 'SUB_AGENT_01', 'AUTH_SERVICE', 'DB_SYNC', 'METRICS_COLLECTOR'];
    const actions = ['ALLOCATING_MEMORY', 'DELEGATING_TASK', 'SYNC_COMPLETE', 'CACHE_MISS', 'THREAT_DETECTED'];
    const statuses = ['OK', 'PENDING', 'WARNING', 'FAIL'];
    
    const time = new Date().toISOString().split('T')[1].substring(0, 12);
    const proc = processes[Math.floor(Math.random() * processes.length)];
    const act = actions[Math.floor(Math.random() * actions.length)];
    const stat = statuses[Math.floor(Math.random() * statuses.length)];
    const hex = Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0');

    return `[${time}] [0x${hex}] ${proc} > ${act} ... [${stat}]`;
  };

  useEffect(() => {
    // Initial logs
    const initial = Array.from({ length: 20 }).map((_, i) => ({ id: i, text: generateLog() }));
    setLogs(initial);

    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, { id: Date.now(), text: generateLog() }];
        return newLogs.slice(-100); // keep last 100
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 h-full flex flex-col"
    >
      <div className="flex items-center gap-3 mb-4">
        <TerminalIcon className="text-red-500" />
        <h2 className="text-xl font-bold font-mono text-red-500 drop-shadow-[0_0_8px_rgba(255,61,84,0.8)]">SYSTEM_LOGS</h2>
      </div>

      <div className="flex-1 bg-black/80 rounded-xl border-2 border-red-900/50 p-4 font-mono text-xs overflow-y-auto custom-scrollbar shadow-[inset_0_0_50px_rgba(255,61,84,0.1)] relative">
        {/* CRT Scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />

        <div className="space-y-1 relative z-20">
          {logs.map((log) => {
            const isWarning = log.text.includes('[WARNING]');
            const isFail = log.text.includes('[FAIL]');
            return (
              <div 
                key={log.id} 
                className={`${isFail ? 'text-red-500 bg-red-900/20' : isWarning ? 'text-yellow-500' : 'text-emerald-400/80'} 
                  hover:bg-white/5 px-2 py-0.5 rounded transition-colors`}
              >
                {log.text}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>
    </motion.div>
  );
};

export default Logs;
