"use client";

import React, { useState, useEffect } from "react";
import { AppId } from "@/types/desktop";
import { useDesktopStore } from "@/stores/useDesktopStore";
import "./WindowControls.css";

export interface WindowControlsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  appId?: AppId;
  zoomIcon?: "fullscreen" | "plus";
  className?: string;
}

export default function WindowControls({
  onClose,
  onMinimize,
  onMaximize,
  appId,
  zoomIcon,
  className = "",
}: WindowControlsProps) {
  const desktopStore = useDesktopStore();
  const isMax = appId ? desktopStore.windows[appId]?.isMaximized : false;

  // Track Alt / Option key for macOS zoom toggle
  const [altPressed, setAltPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Alt" || e.altKey) setAltPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Alt" || !e.altKey) setAltPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Determine whether this window should show the plus (+) button
  // Settings, Calculator and utilities naturally use zoom (+), while other apps use fullscreen (diagonal split)
  const isPlusByDefault = appId === "settings" || appId === "calculator";
  const effectiveZoomIcon = zoomIcon || (isPlusByDefault ? "plus" : "fullscreen");
  const showPlusIcon = effectiveZoomIcon === "plus" || altPressed;

  // Handle Close
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    } else if (appId) {
      desktopStore.closeWindow(appId);
    }
  };

  // Handle Minimize
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMinimize) {
      onMinimize();
    } else if (appId && !isMax) {
      desktopStore.minimizeWindow(appId);
    }
  };

  // Handle Maximize
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMaximize) {
      onMaximize();
    } else if (appId) {
      desktopStore.maximizeWindow(appId);
    }
  };

  return (
    <div className={`mac-titlebar ${className}`.trim()}>
      <div className="traffic-lights">
        {/* Red: Close */}
        <button
          className="traffic-light close"
          onClick={handleClose}
          aria-label="Close window"
          title="Close"
        >
          <svg
            className="w-[7.5px] h-[7.5px]"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          >
            <line x1="2.2" y1="2.2" x2="7.8" y2="7.8" />
            <line x1="7.8" y1="2.2" x2="2.2" y2="7.8" />
          </svg>
        </button>

        {/* Yellow: Minimize */}
        <button
          className="traffic-light minimize"
          onClick={handleMinimize}
          disabled={isMax}
          aria-label="Minimize window"
          title="Minimize"
        >
          <svg
            className="w-[8px] h-[8px]"
            viewBox="0 0 10 10"
            fill="currentColor"
          >
            <rect x="1.4" y="3.9" width="7.2" height="2.2" rx="1.1" />
          </svg>
        </button>

        {/* Green: Fullscreen / Zoom */}
        <button
          className="traffic-light maximize"
          onClick={handleMaximize}
          aria-label={showPlusIcon ? "Zoom window" : "Enter full screen"}
          title={showPlusIcon ? "Zoom" : "Full Screen"}
        >
          {showPlusIcon ? (
            /* Minimal Plus (+) Icon used for Settings, Calculator, etc. */
            <svg
              className="w-[7.5px] h-[7.5px]"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <line x1="5" y1="1.8" x2="5" y2="8.2" />
              <line x1="1.8" y1="5" x2="8.2" y2="5" />
            </svg>
          ) : (
            /* Authentic macOS diagonal split fullscreen glyph matching reference */
            <svg
              className="w-[7.5px] h-[7.5px]"
              viewBox="0 0 10 10"
              fill="currentColor"
            >
              {/* Top-left rounded wedge */}
              <path d="M1.6 3.2C1.6 2.3 2.3 1.6 3.2 1.6H7.2L1.6 7.2V3.2Z" />
              {/* Bottom-right rounded wedge */}
              <path d="M8.4 6.8C8.4 7.7 7.7 8.4 6.8 8.4H2.8L8.4 2.8V6.8Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export { WindowControls };
