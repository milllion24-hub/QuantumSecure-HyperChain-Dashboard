import React from 'react';
import InfoCard from './InfoCard';
import { CpuChipIcon } from './icons/CpuChipIcon';

const consensusLayers = [
  { name: 'Delegated Proof of Quantum Stake', role: 'Primary Mechanism' },
  { name: 'Parallel Byzantine Agreement', role: 'Secondary Validation' },
  { name: 'Quantum Verified Proof', role: 'Finality Layer' },
];

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
    <span className="text-gray-400">{label}</span>
    <span className="font-semibold text-gray-200 text-right">{value}</span>
  </div>
);

const ConsensusSection: React.FC = () => {
  return (
    <InfoCard title="Hybrid Consensus" icon={<CpuChipIcon className="h-6 w-6 text-cyan-400" />}>
      <div className="space-y-2 mb-4">
        {consensusLayers.map(layer => (
          <div key={layer.name} className="bg-gray-900/50 p-3 rounded-md">
            <p className="font-medium text-gray-200">{layer.name}</p>
            <p className="text-xs text-cyan-400">{layer.role}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        <DetailItem label="Validator Nodes" value="1,000" />
        <DetailItem label="DAG Sharding Factor" value="16 Shards" />
        <DetailItem label="Required Stake" value="100,000 Tokens" />
        <DetailItem label="Cross-Shard Protocol" value="Atomic Quantum Commitments" />
        <DetailItem label="Randomness Source" value="Quantum Random" />
      </div>
    </InfoCard>
  );
};

export default ConsensusSection;