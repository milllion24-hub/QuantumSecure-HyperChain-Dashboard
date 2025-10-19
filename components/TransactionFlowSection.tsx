import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const flowSteps = [
  { name: 'Transaction Initiated', description: 'User request created and broadcasted to the network.' },
  { name: 'Multi-Signature Signing', description: 'Signed with multiple quantum-resistant algorithms.' },
  { name: 'Node Validation', description: 'Validators verify signatures and transaction validity.' },
  { name: 'DAG Confirmation', description: 'Transaction added to the DAG structure and finalized.' },
];

const algorithms = ['SPHINCS+', 'NTRU', 'Kyber', 'FALCON'];

const TransactionFlowSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSignatures, setCompletedSignatures] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // If we are at the signing step (index 1) and not all signatures are completed
      if (currentStep === 1 && completedSignatures < algorithms.length) {
        setCompletedSignatures(prev => prev + 1);
      } else {
        // Move to the next main step
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep > flowSteps.length) {
            // Reset simulation
            setCompletedSignatures(0);
            return 0;
          }
          return nextStep;
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [currentStep, completedSignatures]);

  const getStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  return (
    <InfoCard title="Live Transaction Flow" icon={<ArrowPathIcon className="h-6 w-6 text-cyan-400" />}>
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-700/50"></div>
        
        {flowSteps.map((step, index) => {
          const status = getStatus(index);
          const isCompleted = status === 'completed';
          const isActive = status === 'active';

          return (
            <div key={step.name} className="relative mb-6 pl-4">
              <div className={`absolute -left-[10px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${isCompleted ? 'bg-green-500 border-green-400' : ''}
                ${isActive ? 'bg-cyan-500 border-cyan-400 animate-pulse' : ''}
                ${status === 'pending' ? 'bg-gray-700 border-gray-600' : ''}
              `}>
                {isCompleted && <CheckCircleIcon className="w-3 h-3 text-white stroke-2" />}
              </div>
              <div>
                <h3 className={`font-semibold
                  ${isCompleted ? 'text-green-400' : ''}
                  ${isActive ? 'text-cyan-400' : ''}
                  ${status === 'pending' ? 'text-gray-400' : ''}
                `}>{step.name}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
              
              {index === 1 && (currentStep >= 1) && (
                <div className="mt-3 ml-2 space-y-2">
                  {algorithms.map((algo, sigIndex) => (
                    <div key={algo} className="flex items-center text-sm transition-opacity duration-500"
                      style={{ opacity: sigIndex < completedSignatures ? 1 : 0.4 }}
                    >
                      <CheckCircleIcon className={`h-4 w-4 mr-2 flex-shrink-0 ${sigIndex < completedSignatures ? 'text-green-400' : 'text-gray-600'}`} />
                      <span className={`${sigIndex < completedSignatures ? 'text-gray-300' : 'text-gray-500'}`}>
                        {algo} signature verified
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </InfoCard>
  );
};

export default TransactionFlowSection;