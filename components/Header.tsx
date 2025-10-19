import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-gray-100">
              QuantumSecure HyperChain
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-400 font-medium">System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
