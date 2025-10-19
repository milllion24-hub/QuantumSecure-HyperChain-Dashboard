import React from 'react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-gray-800/70 border border-gray-700 rounded-lg p-6 shadow-lg backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-300 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gray-700 rounded-md mr-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
      </div>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
