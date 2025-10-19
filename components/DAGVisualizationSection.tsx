import React, { useState, useEffect, useRef } from 'react';
import InfoCard from './InfoCard';
import { ShareIcon } from './icons/ShareIcon';

type NodeStatus = 'unconfirmed' | 'pending' | 'confirmed';

interface DAGNode {
  id: number;
  status: NodeStatus;
}

const GRID_SIZE = 120; // 12 rows * 10 cols

const DAGVisualizationSection: React.FC = () => {
  const [nodes, setNodes] = useState<DAGNode[]>(() =>
    Array.from({ length: GRID_SIZE }, (_, i) => ({ id: i, status: 'unconfirmed' }))
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      // Fix: Explicitly defining the return type for the updater function to prevent type widening issues.
      setNodes((prevNodes): DAGNode[] => {
        const unconfirmedNodes = prevNodes.filter(n => n.status === 'unconfirmed');
        if (unconfirmedNodes.length === 0) {
          // Reset if all nodes are confirmed
          return Array.from({ length: GRID_SIZE }, (_, i) => ({ id: i, status: 'unconfirmed' }));
        }

        const nodeToActivate = unconfirmedNodes[Math.floor(Math.random() * unconfirmedNodes.length)];
        
        // FIX: Add explicit return type to map callback to prevent type widening of 'status' property.
        const newNodes = prevNodes.map((n): DAGNode =>
          n.id === nodeToActivate.id ? { ...n, status: 'pending' } : n
        );

        setTimeout(() => {
          setNodes(currentNodes =>
            // FIX: Add explicit return type to map callback to prevent type widening of 'status' property.
            currentNodes.map((n): DAGNode =>
              n.id === nodeToActivate.id ? { ...n, status: 'confirmed' } : n
            )
          );
        }, 1500);

        return newNodes;
      });
    }, 700);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getNodeColor = (status: NodeStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-cyan-500/80';
      case 'pending':
        return 'bg-yellow-500/80 animate-pulse';
      case 'unconfirmed':
        return 'bg-gray-700/50';
    }
  };

  return (
    <InfoCard title="Live DAG Structure" icon={<ShareIcon className="h-6 w-6 text-cyan-400" />}>
      <div className="grid grid-cols-12 gap-1.5 h-64 p-2 bg-black/30 rounded-lg overflow-hidden">
        {nodes.map(node => (
          <div
            key={node.id}
            className={`w-full h-full rounded-sm transition-colors duration-500 ${getNodeColor(node.status)}`}
          ></div>
        ))}
      </div>
       <div className="flex justify-center items-center space-x-4 mt-4 text-xs text-gray-400">
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-gray-700/50 mr-2"></div>Unconfirmed</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-yellow-500/80 mr-2"></div>Pending</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-cyan-500/80 mr-2"></div>Confirmed</div>
        </div>
    </InfoCard>
  );
};

export default DAGVisualizationSection;