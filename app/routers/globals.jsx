import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};
