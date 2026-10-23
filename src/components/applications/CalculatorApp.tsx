'use client';

import React, { useState } from 'react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [clearNext, setClearNext] = useState(false);

  const handleNumber = (n: string) => {
    if (display === '0' || clearNext) {
      setDisplay(n);
      setClearNext(false);
    } else {
      setDisplay(display + n);
    }
  };

  const handleOp = (op: string) => {
    setPrevVal(parseFloat(display));
    setOperation(op);
    setClearNext(true);
  };

  const handleEquals = () => {
    if (prevVal === null || operation === null) return;
    const current = parseFloat(display);
    let result = 0;
    switch (operation) {
      case '+':
        result = prevVal + current;
        break;
      case '-':
        result = prevVal - current;
        break;
      case '×':
        result = prevVal * current;
        break;
      case '÷':
        result = current !== 0 ? prevVal / current : 0;
        break;
    }
    setDisplay(String(result));
    setPrevVal(null);
    setOperation(null);
    setClearNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
    setClearNext(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#2c2c2e] text-white p-3 select-none">
      <div className="h-20 flex items-end justify-end px-3 pb-2 text-4xl font-light tracking-tight overflow-hidden">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2 flex-1">
        <button
          onClick={handleClear}
          className="rounded-full bg-[#505054] hover:bg-[#636366] text-black font-medium text-sm flex items-center justify-center transition-colors"
        >
          AC
        </button>
        <button
          onClick={() => setDisplay(String(-parseFloat(display)))}
          className="rounded-full bg-[#505054] hover:bg-[#636366] text-black font-medium text-sm flex items-center justify-center transition-colors"
        >
          ±
        </button>
        <button
          onClick={() => setDisplay(String(parseFloat(display) / 100))}
          className="rounded-full bg-[#505054] hover:bg-[#636366] text-black font-medium text-sm flex items-center justify-center transition-colors"
        >
          %
        </button>
        <button
          onClick={() => handleOp('÷')}
          className="rounded-full bg-[#ff9f0a] hover:bg-[#ffb340] text-white font-medium text-base flex items-center justify-center transition-colors"
        >
          ÷
        </button>

        {['7', '8', '9'].map((n) => (
          <button
            key={n}
            onClick={() => handleNumber(n)}
            className="rounded-full bg-[#646468] hover:bg-[#7c7c80] text-white font-medium text-base flex items-center justify-center transition-colors"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => handleOp('×')}
          className="rounded-full bg-[#ff9f0a] hover:bg-[#ffb340] text-white font-medium text-base flex items-center justify-center transition-colors"
        >
          ×
        </button>

        {['4', '5', '6'].map((n) => (
          <button
            key={n}
            onClick={() => handleNumber(n)}
            className="rounded-full bg-[#646468] hover:bg-[#7c7c80] text-white font-medium text-base flex items-center justify-center transition-colors"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => handleOp('-')}
          className="rounded-full bg-[#ff9f0a] hover:bg-[#ffb340] text-white font-medium text-base flex items-center justify-center transition-colors"
        >
          -
        </button>

        {['1', '2', '3'].map((n) => (
          <button
            key={n}
            onClick={() => handleNumber(n)}
            className="rounded-full bg-[#646468] hover:bg-[#7c7c80] text-white font-medium text-base flex items-center justify-center transition-colors"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => handleOp('+')}
          className="rounded-full bg-[#ff9f0a] hover:bg-[#ffb340] text-white font-medium text-base flex items-center justify-center transition-colors"
        >
          +
        </button>

        <button
          onClick={() => handleNumber('0')}
          className="col-span-2 rounded-full bg-[#646468] hover:bg-[#7c7c80] text-white font-medium text-base flex items-center pl-6 transition-colors"
        >
          0
        </button>
        <button
          onClick={() => {
            if (!display.includes('.')) setDisplay(display + '.');
          }}
          className="rounded-full bg-[#646468] hover:bg-[#7c7c80] text-white font-medium text-base flex items-center justify-center transition-colors"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="rounded-full bg-[#ff9f0a] hover:bg-[#ffb340] text-white font-medium text-base flex items-center justify-center transition-colors"
        >
          =
        </button>
      </div>
    </div>
  );
};
