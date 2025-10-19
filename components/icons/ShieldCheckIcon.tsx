import React from 'react';

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5c-1.12 6.333-6.12 10.5-8.25 10.5S4.87 18.333 3.75 12z" />
  </svg>
);
