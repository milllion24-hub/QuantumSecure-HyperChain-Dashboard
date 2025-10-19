import React, { useState, useEffect, useRef } from 'react';
import InfoCard from './InfoCard';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { ClockIcon } from './icons/ClockIcon';

const algorithms = ['SPHINCS+', 'NTRU', 'CRYSTALS-Kyber', 'FALCON'];
type Stage = 'idle' | 'hashing' | 'signing' | 'simulatingLatency' | 'broadcasting' | 'confirmed';

const TransactionSimulator: React.FC = () => {
  const [stage, setStage] = useState<Stage>('idle');
  const [signatures, setSignatures] = useState<number>(0);
  const [networkLatency, setNetworkLatency] = useState<number>(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const setSafeTimeout = (callback: () => void, delay: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(callback, delay);
  };

  const handleBroadcast = () => {
    setStage('hashing');
    setSignatures(0);

    // Start simulation after hashing animation
    setSafeTimeout(() => {
      setStage('signing');

      const signSequentially = (index: number) => {
        // When index reaches the number of algorithms, all are being processed
        if (index >= algorithms.length) {
          // Mark all as complete and proceed
          setSignatures(algorithms.length); 
          setSafeTimeout(() => {
            const latency = Math.floor(Math.random() * (2500 - 1000 + 1)) + 1000;
            setNetworkLatency(latency);
            setStage('simulatingLatency');
            setSafeTimeout(() => {
              setStage('broadcasting');
              setSafeTimeout(() => {
                setStage('confirmed');
                setSafeTimeout(() => setStage('idle'), 3000);
              }, 2000);
            }, latency);
          }, 500); // Brief pause after final signature
          return;
        }
        
        // Set the current signing index
        setSignatures(index);
        // Move to the next signature after a delay
        setSafeTimeout(() => signSequentially(index + 1), 800);
      };

      // Start the signing process from the first algorithm
      signSequentially(0);
    }, 1500);
  };

  const renderContent = () => {
    switch (stage) {
      case 'hashing':
        return <div className="flex items-center justify-center h-48"><ArrowPathIcon className="h-8 w-8 text-cyan-400 animate-spin mr-3" /> Generating Transaction Hash...</div>;
      case 'signing':
        return (
          <div className="h-48 p-4 flex flex-col justify-center">
            <h4 className="font-semibold mb-4 text-center">Applying Quantum-Resistant Signatures...</h4>
            <div className="space-y-3">
              {algorithms.map((algo, index) => {
                const isCompleted = signatures > index;
                const isSigning = signatures === index && stage === 'signing';

                let icon;
                let textColor = 'text-gray-500';
                let statusText = null;

                if (isCompleted) {
                  icon = <CheckCircleIcon className="h-5 w-5 text-green-400" />;
                  textColor = 'text-gray-300';
                } else if (isSigning) {
                  icon = <ArrowPathIcon className="h-5 w-5 text-cyan-400 animate-spin" />;
                  textColor = 'text-cyan-400 font-semibold';
                  statusText = <span className="ml-auto text-xs text-cyan-400 animate-pulse">signing...</span>;
                } else {
                  // Pending
                  icon = <div className="w-2.5 h-2.5 rounded-full bg-gray-600 border border-gray-500"></div>;
                }

                return (
                  <div key={algo} className="flex items-center text-sm transition-all duration-300">
                    <div className="w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      {icon}
                    </div>
                    <span className={textColor}>{algo}</span>
                    {statusText}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'simulatingLatency':
        return (
            <div className="flex items-center justify-center h-48">
                <ClockIcon className="h-8 w-8 text-yellow-400 animate-pulse mr-4" />
                <div>
                    <p className="font-semibold">Simulating network latency...</p>
                    <p className="text-sm text-gray-400">Waiting for {(networkLatency / 1000).toFixed(1)}s</p>
                </div>
            </div>
        );
      case 'broadcasting':
        return <div className="flex items-center justify-center h-48"><PaperAirplaneIcon className="h-8 w-8 text-cyan-400 animate-pulse mr-3" /> Broadcasting to Network...</div>;
      case 'confirmed':
        return <div className="flex flex-col items-center justify-center h-48"><CheckCircleIcon className="h-12 w-12 text-green-400 mb-2" /> Transaction Confirmed & Finalized!</div>;
      case 'idle':
      default:
        return (
          <div className="h-48 flex flex-col justify-center items-center">
            <div className="w-full max-w-md space-y-3 p-4">
                <div>
                    <label className="text-xs text-gray-400">From</label>
                    <div className="p-2 bg-gray-900/50 rounded-md font-mono text-sm truncate">0xQSHC...a1b2</div>
                </div>
                <div>
                    <label className="text-xs text-gray-400">To</label>
                    <div className="p-2 bg-gray-900/50 rounded-md font-mono text-sm truncate">0xQSHC...c3d4</div>
                </div>
                 <div>
                    <label className="text-xs text-gray-400">Amount</label>
                    <div className="p-2 bg-gray-900/50 rounded-md font-mono text-sm">42.0 Q-Tokens</div>
                </div>
            </div>
            <button
              onClick={handleBroadcast}
              disabled={stage !== 'idle'}
              className="mt-4 px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Create & Broadcast Transaction
            </button>
          </div>
        );
    }
  };

  return (
    <InfoCard title="Transaction Simulator" icon={<PaperAirplaneIcon className="h-6 w-6 text-cyan-400" />}>
      {renderContent()}
    </InfoCard>
  );
};

export default TransactionSimulator;