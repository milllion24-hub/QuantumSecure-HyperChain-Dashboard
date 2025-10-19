import React from 'react';
import InfoCard from './InfoCard';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const apis = [
  "JSON-RPC",
  "REST",
  "WebSocket",
  "Quantum-Secure API"
];

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
    <span className="text-gray-400">{label}</span>
    <span className="font-semibold text-gray-200 text-right">{value}</span>
  </div>
);

const NetworkSection: React.FC = () => {
  return (
    <InfoCard title="Network & APIs" icon={<GlobeAltIcon className="h-6 w-6 text-cyan-400" />}>
      <div className="space-y-1 mb-4">
        <DetailItem label="P2P Protocol" value="Quantum Optimized Gossip" />
        <DetailItem label="Total Nodes" value="100,000+" />
        <DetailItem label="Bandwidth" value="Dynamic Allocation" />
        <DetailItem label="Latency" value="Optimized" />
      </div>
      
      <div>
        <h3 className="text-md font-semibold text-gray-300 mb-2">Available APIs</h3>
        <div className="grid grid-cols-2 gap-2">
          {apis.map((api) => (
            <div key={api} className="flex items-center bg-gray-900/50 p-2 rounded-md text-sm">
              <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
              <span>{api}</span>
            </div>
          ))}
        </div>
      </div>
    </InfoCard>
  );
};

export default NetworkSection;
