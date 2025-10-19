import React from 'react';
import Header from './components/Header';
import StatusSection from './components/StatusSection';
import CryptographySection from './components/CryptographySection';
import ConsensusSection from './components/ConsensusSection';
import NetworkSection from './components/NetworkSection';
import TransactionFlowSection from './components/TransactionFlowSection';
import TransactionSimulator from './components/TransactionSimulator';
import DAGVisualizationSection from './components/DAGVisualizationSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="md:col-span-2 xl:col-span-4">
            <StatusSection />
          </div>
          
          <CryptographySection />
          <ConsensusSection />
          <div className="md:col-span-2 xl:col-span-2">
            <NetworkSection />
          </div>

          <div className="md:col-span-2 xl:col-span-2">
            <TransactionFlowSection />
          </div>
          <div className="md:col-span-2 xl:col-span-2">
            <DAGVisualizationSection />
          </div>

          <div className="md:col-span-2 xl:col-span-4">
            <TransactionSimulator />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>QuantumSecure HyperChain Dashboard - Visualizing the Future of Blockchain</p>
      </footer>
    </div>
  );
};

export default App;