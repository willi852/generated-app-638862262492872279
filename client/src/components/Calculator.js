import React, { useState } from 'react';
import axios from 'axios';
import Display from './Display';
import Keypad from './Keypad';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearAll();
    } else if (value === 'CE') {
      clearEntry();
    } else if (value === 'DEL') {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev + value);
    }
  };

  const calculateResult = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post(`${BASE_URL}/api/calculate`, {
        expression: input
      });

      const calculationResult = response.data.result.toString();
      setResult(calculationResult);
      setHistory(prev => [...prev, { expression: input, result: calculationResult }]);
    } catch (err) {
      console.error('Calculation error:', err);
      setError(err.response?.data?.error || 'An error occurred during calculation');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setResult('');
    setError(null);
  };

  const clearEntry = () => {
    setInput('');
    setError(null);
  };

  return (
    <div className="calculator">
      <Display
        input={input}
        result={result}
        error={error}
        isLoading={isLoading}
      />
      <Keypad handleButtonClick={handleButtonClick} />
      {history.length > 0 && (
        <div className="history">
          <h3>History</h3>
          <ul>
            {history.slice().reverse().map((item, index) => (
              <li key={index}>
                {item.expression} = {item.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;