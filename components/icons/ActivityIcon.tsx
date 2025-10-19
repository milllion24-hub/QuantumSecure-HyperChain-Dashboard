import React from 'react';

export const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l3 3m0 0l3-3m-3 3V3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 10.5l-3-3m0 0l-3 3m3-3v10.5" />
  </svg>
);
