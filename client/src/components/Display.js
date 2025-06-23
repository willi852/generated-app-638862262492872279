import React from 'react';

const Display = ({ input, result, error, isLoading }) => {
  return (
    <div className="display">
      <div className="input">
        {isLoading ? 'Calculating...' : input || '0'}
      </div>
      <div className="result">
        {error ? (
          <span className="error">{error}</span>
        ) : (
          result ? `= ${result}` : ''
        )}
      </div>
    </div>
  );
};

export default Display;