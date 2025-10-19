import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import { ActivityIcon } from './icons/ActivityIcon';

const initialLogs = [
  "QuantumSecure HyperChain запущен",
  "Целевая производительность: 5,000,000 TPS",
  "Квантово-устойчивая криптография: ['sphincs_plus', 'ntru_hps_2048_509', 'kyber_1024', 'falcon_1024']",
  "Инициализация консенсусного механизма DPoQS...",
  "Инициализация P2P-сети с квантовой оптимизацией...",
  "Активация системы мониторинга безопасности...",
];

const newLogs = [
  "Запуск процесса выборов валидаторов...",
  "Запуск процесса распространения транзакций...",
  "Запуск систем обнаружения угроз...",
  "Новый блок финализирован. Хэш: 0x1a2b3c...",
  "Синхронизация DAG-структур между шардами...",
  "Система реагирования на инциденты активна.",
  "Кросс-шардовая транзакция подтверждена через Atomic Quantum Commitments.",
];

const StatusSection: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(initialLogs.slice(0, 4));
  const [logIndex, setLogIndex] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prevLogs => {
        const nextLog = logIndex < initialLogs.length ? initialLogs[logIndex] : newLogs[(logIndex - initialLogs.length) % newLogs.length];
        const updatedLogs = [...prevLogs, nextLog];
        if (updatedLogs.length > 10) {
          updatedLogs.shift();
        }
        return updatedLogs;
      });
      setLogIndex(prevIndex => prevIndex + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [logIndex]);
  
  const StatItem: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
    <div className="text-center">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-2xl sm:text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );


  return (
    <InfoCard title="Live System Status" icon={<ActivityIcon className="h-6 w-6 text-cyan-400" />}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gray-900/50 rounded-lg">
        <StatItem label="Target TPS" value="5,000,000" color="text-green-400" />
        <StatItem label="Block Time" value="0.5s" color="text-cyan-400" />
        <StatItem label="Validator Nodes" value="1,000" color="text-purple-400" />
        <StatItem label="Shard Factor" value="16" color="text-yellow-400" />
      </div>
      <div className="h-48 bg-black/50 rounded-lg p-4 font-mono text-sm overflow-y-auto border border-gray-700">
        {logs.map((log, index) => (
          <p key={index} className="animate-fadeIn text-green-300">
            <span className="text-gray-500 mr-2">{`[${new Date().toLocaleTimeString()}]>`}</span>
            {log}
          </p>
        ))}
      </div>
    </InfoCard>
  );
};

export default StatusSection;
