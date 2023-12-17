// components/Loader.tsx
import React from 'react';
import './Loader.module.css'
const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
  );
};

export default Loader;
