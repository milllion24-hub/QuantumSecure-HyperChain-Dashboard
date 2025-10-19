import React from 'react';
import InfoCard from './InfoCard';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const algorithms = [
  { name: 'SPHINCS+', type: 'Hash-based' },
  { name: 'NTRU', type: 'Lattice-based' },
  { name: 'CRYSTALS-Kyber', type: 'Lattice-based' },
  { name: 'FALCON', type: 'Lattice-based' },
];

const CryptographySection: React.FC = () => {
  return (
    <InfoCard title="Quantum-Resistant Cryptography" icon={<LockClosedIcon className="h-6 w-6 text-cyan-400" />}>
      <p className="mb-4 text-gray-400">
        A multi-layered cryptographic approach to ensure security against both classical and quantum computers.
      </p>
      <div className="space-y-3">
        {algorithms.map((algo) => (
          <div key={algo.name} className="flex items-center bg-gray-900/50 p-3 rounded-md">
            <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-200">{algo.name}</p>
              <p className="text-xs text-gray-500">{algo.type}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="font-semibold text-gray-200">Multi-Signature Threshold</p>
        <p className="text-gray-400">Requires <span className="font-bold text-cyan-400">3 of 4</span> algorithm signatures for transaction validity.</p>
      </div>
    </InfoCard>
  );
};

export default CryptographySection;
