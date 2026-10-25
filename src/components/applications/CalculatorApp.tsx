'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const CalculatorApp: React.FC = () => {
  const { theme } = useDesktopStore();
  const isDark = theme === 'dark';
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === '0' ? digit : display + digit);
      }
    },
    [display, waitingForOperand]
  );

  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clearAll = useCallback(() => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  const clearDisplay = useCallback(() => {
    setDisplay('0');
  }, []);

  const toggleSign = useCallback(() => {
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setDisplay(String(-val));
    }
  }, [display]);

  const inputPercent = useCallback(() => {
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setDisplay(String(val / 100));
    }
  }, [display]);

  const performOperation = useCallback(
    (nextOperator: string) => {
      const inputValue = parseFloat(display);

      if (prevValue === null) {
        setPrevValue(inputValue);
      } else if (operator) {
        const currentValue = prevValue || 0;
        let newValue = currentValue;

        switch (operator) {
          case '+':
            newValue = currentValue + inputValue;
            break;
          case '-':
            newValue = currentValue - inputValue;
            break;
          case '×':
            newValue = currentValue * inputValue;
            break;
          case '÷':
            newValue = inputValue !== 0 ? currentValue / inputValue : 0;
            break;
        }

        const formatted = parseFloat(newValue.toFixed(8));
        setDisplay(String(formatted));
        setPrevValue(formatted);
      }

      setWaitingForOperand(true);
      setOperator(nextOperator);
    },
    [display, prevValue, operator]
  );

  const calculateEquals = useCallback(() => {
    if (!operator || prevValue === null) return;
    const inputValue = parseFloat(display);
    let result = prevValue;

    switch (operator) {
      case '+':
        result = prevValue + inputValue;
        break;
      case '-':
        result = prevValue - inputValue;
        break;
      case '×':
        result = prevValue * inputValue;
        break;
      case '÷':
        result = inputValue !== 0 ? prevValue / inputValue : 0;
        break;
    }

    const formatted = parseFloat(result.toFixed(8));
    setDisplay(String(formatted));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }, [display, prevValue, operator]);

  // Global Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDot();
      } else if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        calculateEquals();
      } else if (e.key === '+') {
        performOperation('+');
      } else if (e.key === '-') {
        performOperation('-');
      } else if (e.key === '*') {
        performOperation('×');
      } else if (e.key === '/') {
        e.preventDefault();
        performOperation('÷');
      } else if (e.key === '%') {
        inputPercent();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearAll();
      } else if (e.key === 'Backspace') {
        setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDot, calculateEquals, performOperation, inputPercent, clearAll]);

  const clearLabel = display !== '0' ? 'C' : 'AC';

  return (
    <div
      className={`flex flex-col h-full justify-end p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] select-none font-[-apple-system,BlinkMacSystemFont,sans-serif] transition-colors duration-200 ${
        isDark ? 'bg-black text-white' : 'bg-[#f4f4f7] text-neutral-900'
      }`}
    >
      <div className="w-full max-w-xs sm:max-w-sm mx-auto flex flex-col justify-end flex-1">
        {/* Display Screen */}
        <div className="flex-1 min-h-[80px] flex items-end justify-end px-3 pb-3 overflow-hidden">
          <span
            className={`font-light tracking-tight transition-all tabular-nums text-right ${
              display.length > 11
                ? 'text-4xl'
                : display.length > 8
                ? 'text-5xl'
                : 'text-6xl sm:text-7xl'
            } ${isDark ? 'text-white' : 'text-neutral-900'}`}
          >
            {display}
          </span>
        </div>

        {/* Calculator Buttons Grid - Authentic Circular Keys */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
          {/* Row 1 */}
          <button
            onClick={display !== '0' ? clearDisplay : clearAll}
            className={`aspect-square rounded-full font-medium text-lg sm:text-xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              isDark
                ? 'bg-[#a5a5a5] hover:bg-[#d4d4d2] text-black active:bg-[#d4d4d2]'
                : 'bg-[#d0d0d4] hover:bg-[#c2c2c6] text-neutral-900 active:bg-[#b5b5ba]'
            }`}
          >
            {clearLabel}
          </button>
          <button
            onClick={toggleSign}
            className={`aspect-square rounded-full font-medium text-lg sm:text-xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              isDark
                ? 'bg-[#a5a5a5] hover:bg-[#d4d4d2] text-black active:bg-[#d4d4d2]'
                : 'bg-[#d0d0d4] hover:bg-[#c2c2c6] text-neutral-900 active:bg-[#b5b5ba]'
            }`}
          >
            ±
          </button>
          <button
            onClick={inputPercent}
            className={`aspect-square rounded-full font-medium text-lg sm:text-xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              isDark
                ? 'bg-[#a5a5a5] hover:bg-[#d4d4d2] text-black active:bg-[#d4d4d2]'
                : 'bg-[#d0d0d4] hover:bg-[#c2c2c6] text-neutral-900 active:bg-[#b5b5ba]'
            }`}
          >
            %
          </button>
          <button
            onClick={() => performOperation('÷')}
            className={`aspect-square rounded-full font-medium text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              operator === '÷' && waitingForOperand
                ? 'bg-white text-[#ff9f0a] ring-2 ring-[#ff9f0a]'
                : 'bg-[#ff9f0a] hover:bg-[#ffb340] text-white active:bg-[#cc7f08]'
            }`}
          >
            ÷
          </button>

          {/* Row 2 */}
          {['7', '8', '9'].map((n) => (
            <button
              key={n}
              onClick={() => inputDigit(n)}
              className={`aspect-square rounded-full font-medium text-xl sm:text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
                isDark
                  ? 'bg-[#333333] hover:bg-[#48484a] text-white active:bg-[#505050]'
                  : 'bg-white hover:bg-neutral-100 text-neutral-900 active:bg-neutral-200'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => performOperation('×')}
            className={`aspect-square rounded-full font-medium text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              operator === '×' && waitingForOperand
                ? 'bg-white text-[#ff9f0a] ring-2 ring-[#ff9f0a]'
                : 'bg-[#ff9f0a] hover:bg-[#ffb340] text-white active:bg-[#cc7f08]'
            }`}
          >
            ×
          </button>

          {/* Row 3 */}
          {['4', '5', '6'].map((n) => (
            <button
              key={n}
              onClick={() => inputDigit(n)}
              className={`aspect-square rounded-full font-medium text-xl sm:text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
                isDark
                  ? 'bg-[#333333] hover:bg-[#48484a] text-white active:bg-[#505050]'
                  : 'bg-white hover:bg-neutral-100 text-neutral-900 active:bg-neutral-200'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => performOperation('-')}
            className={`aspect-square rounded-full font-medium text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              operator === '-' && waitingForOperand
                ? 'bg-white text-[#ff9f0a] ring-2 ring-[#ff9f0a]'
                : 'bg-[#ff9f0a] hover:bg-[#ffb340] text-white active:bg-[#cc7f08]'
            }`}
          >
            −
          </button>

          {/* Row 4 */}
          {['1', '2', '3'].map((n) => (
            <button
              key={n}
              onClick={() => inputDigit(n)}
              className={`aspect-square rounded-full font-medium text-xl sm:text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
                isDark
                  ? 'bg-[#333333] hover:bg-[#48484a] text-white active:bg-[#505050]'
                  : 'bg-white hover:bg-neutral-100 text-neutral-900 active:bg-neutral-200'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => performOperation('+')}
            className={`aspect-square rounded-full font-medium text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              operator === '+' && waitingForOperand
                ? 'bg-white text-[#ff9f0a] ring-2 ring-[#ff9f0a]'
                : 'bg-[#ff9f0a] hover:bg-[#ffb340] text-white active:bg-[#cc7f08]'
            }`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputDigit('0')}
            className={`col-span-2 rounded-full font-medium text-xl sm:text-2xl flex items-center justify-start pl-7 sm:pl-8 transition-all active:scale-95 shadow-xs ${
              isDark
                ? 'bg-[#333333] hover:bg-[#48484a] text-white active:bg-[#505050]'
                : 'bg-white hover:bg-neutral-100 text-neutral-900 active:bg-neutral-200'
            }`}
          >
            0
          </button>
          <button
            onClick={inputDot}
            className={`aspect-square rounded-full font-medium text-xl sm:text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              isDark
                ? 'bg-[#333333] hover:bg-[#48484a] text-white active:bg-[#505050]'
                : 'bg-white hover:bg-neutral-100 text-neutral-900 active:bg-neutral-200'
            }`}
          >
            .
          </button>
          <button
            onClick={calculateEquals}
            className="aspect-square rounded-full bg-[#ff9f0a] hover:bg-[#ffb340] active:bg-[#cc7f08] text-white font-medium text-2xl flex items-center justify-center transition-all active:scale-95 shadow-xs"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};
