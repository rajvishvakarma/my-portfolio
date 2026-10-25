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

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

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

  const performOperation = useCallback((nextOperator: string) => {
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

      // Format to avoid long floating point precision errors
      const formatted = parseFloat(newValue.toFixed(8));
      setDisplay(String(formatted));
      setPrevValue(formatted);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, prevValue, operator]);

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

  // Determine button label for Clear (C vs AC)
  const clearLabel = display !== '0' ? 'C' : 'AC';

  return (
    <div
      className={`flex flex-col h-full p-3.5 select-none font-[-apple-system,BlinkMacSystemFont,sans-serif] transition-colors duration-200 ${
        isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#e5e5e7] text-neutral-900'
      }`}
    >
      {/* Display Screen */}
      <div className="h-20 flex items-end justify-end px-3 pb-2 overflow-hidden">
        <span
          className={`font-light tracking-tight transition-all tabular-nums ${
            display.length > 11
              ? 'text-2xl'
              : display.length > 8
              ? 'text-3xl'
              : 'text-5xl'
          } ${isDark ? 'text-white' : 'text-neutral-900'}`}
        >
          {display}
        </span>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-4 gap-2 flex-1 mt-1">
        {/* Row 1 */}
        <button
          onClick={display !== '0' ? clearDisplay : clearAll}
          className={`rounded-full font-medium text-base flex items-center justify-center transition-colors active:scale-95 shadow-2xs ${
            isDark
              ? 'bg-[#a5a5a5] hover:bg-[#d4d4d2] text-black'
              : 'bg-[#d0d0d4] hover:bg-[#c2c2c6] text-neutral-900'
          }`}
        >
          {clearLabel}
        </button>
        <button
          onClick={toggleSign}
          className={`rounded-full font-medium text-base flex items-center justify-center transition-colors active:scale-95 shadow-2xs ${
            isDark
              ? 'bg-[#a5a5a5] hover:bg-[#d4d4d2] text-black'
              : 'bg-[#d0d0d4] hover:bg-[#c2c2c6] text-neutral-900'
          }`}
        >
          ±
        </button>
        <button
          onClick={inputPercent}
          className={`rounded-full font-medium text-base flex items-center justify-center transition-colors active:scale-95 shadow-2xs ${
            isDark
              ? 'bg-[#a5a5a5] hover:bg-[#d4d4d2] text-black'
              : 'bg-[#d0d0d4] hover:bg-[#c2c2c6] text-neutral-900'
          }`}
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className={`rounded-full font-medium text-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs ${
            operator === '÷' && waitingForOperand
              ? 'bg-white text-[#ff9f0a] ring-2 ring-[#ff9f0a]'
              : 'bg-[#ff9f0a] hover:bg-[#ffb340] text-white'
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        {['7', '8', '9'].map((n) => (
          <button
            key={n}
            onClick={() => inputDigit(n)}
            className={`rounded-full font-medium text-lg flex items-center justify-center transition-colors active:scale-95 shadow-2xs ${
              isDark
                ? 'bg-[#333333] hover:bg-[#505050] text-white'
                : 'bg-white hover:bg-neutral-100 text-neutral-900'
            }`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => performOperation('×')}
          className={`rounded-full font-medium text-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs ${
            operator === '×' && waitingForOperand
              ? 'bg-white text-[#ff9f0a] ring-2 ring-[#ff9f0a]'
              : 'bg-[#ff9f0a] hover:bg-[#ffb340] text-white'
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        {['4', '5', '6'].map((n) => (
          <button
            key={n}
            onClick={() => inputDigit(n)}
            className={`rounded-full font-medium text-lg flex items-center justify-center transition-colors active:scale-95 shadow-2xs ${
              isDark
                ? 'bg-[#333333] hover:bg-[#505050] text-white'
                : 'bg-white hover:bg-neutral-100 text-neutral-900'
            }`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => performOperation('-')}
          className={`rounded-full font-medium text-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs ${
            operator === '-' && waitingForOperand
              ? 'bg-white text-[#ff9f0a] ring-2 ring-[#ff9f0a]'
              : 'bg-[#ff9f0a] hover:bg-[#ffb340] text-white'
          }`}
        >
          −
        </button>

        {/* Row 4 */}
        {['1', '2', '3'].map((n) => (
          <button
            key={n}
            onClick={() => inputDigit(n)}
            className={`rounded-full font-medium text-lg flex items-center justify-center transition-colors active:scale-95 shadow-2xs ${
              isDark
                ? 'bg-[#333333] hover:bg-[#505050] text-white'
                : 'bg-white hover:bg-neutral-100 text-neutral-900'
            }`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => performOperation('+')}
          className={`rounded-full font-medium text-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs ${
            operator === '+' && waitingForOperand
              ? 'bg-white text-[#ff9f0a] ring-2 ring-[#ff9f0a]'
              : 'bg-[#ff9f0a] hover:bg-[#ffb340] text-white'
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputDigit('0')}
          className={`col-span-2 rounded-full font-medium text-lg flex items-center justify-start pl-7 transition-colors active:scale-95 shadow-2xs ${
            isDark
              ? 'bg-[#333333] hover:bg-[#505050] text-white'
              : 'bg-white hover:bg-neutral-100 text-neutral-900'
          }`}
        >
          0
        </button>
        <button
          onClick={inputDot}
          className={`rounded-full font-medium text-lg flex items-center justify-center transition-colors active:scale-95 shadow-2xs ${
            isDark
              ? 'bg-[#333333] hover:bg-[#505050] text-white'
              : 'bg-white hover:bg-neutral-100 text-neutral-900'
          }`}
        >
          .
        </button>
        <button
          onClick={calculateEquals}
          className="rounded-full bg-[#ff9f0a] hover:bg-[#ffb340] text-white font-medium text-xl flex items-center justify-center transition-colors active:scale-95 shadow-2xs"
        >
          =
        </button>
      </div>
    </div>
  );
};
