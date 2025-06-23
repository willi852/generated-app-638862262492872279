import React from 'react';

const Keypad = ({ handleButtonClick }) => {
  const buttons = [
    'C', 'CE', 'DEL', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '(', ')',
    'sin(', 'cos(', 'tan(', '=',
    'log(', 'ln(', 'sqrt(', '^',
    'π', 'e', 'rand', '!'
  ];

  return (
    <div className="keypad">
      {buttons.map((btn, i) => (
        <button
          key={i}
          className={`key ${btn === '=' ? 'equals' : ''} ${/[\d.]/.test(btn) ? 'digit' : 'operator'}`}
          onClick={() => handleButtonClick(btn)}
        >
          {btn === '*' ? '×' : btn === '/' ? '÷' : 
           btn === '^' ? 'x^y' : btn === 'rand' ? 'RND' : 
           btn === 'π' ? 'π' : btn === 'e' ? 'e' : 
           btn === '!' ? 'x!' : btn}
        </button>
      ))}
    </div>
  );
};

export default Keypad;