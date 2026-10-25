"use client";

import React from "react";

interface MacWifiIconProps {
  size?: number;
  className?: string;
  active?: boolean;
}

/**
 * Authentic macOS SF Symbol Wi-Fi Icon as used in the macOS Menu Bar and Control Center.
 */
export const MacWifiIcon: React.FC<MacWifiIconProps> = ({
  size = 15,
  className = "",
  active = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={`${className} ${!active ? "opacity-40" : ""}`.trim()}
      aria-hidden="true"
    >
      {/* Top outer arc */}
      <path d="M8 2.25c-3.18 0-6.13 1.28-8 3.42.27.31.57.65.88.98 1.63-1.87 4.18-3.05 7.12-3.05s5.49 1.18 7.12 3.05c.31-.33.61-.67.88-.98-1.87-2.14-4.82-3.42-8-3.42z" />
      {/* Middle arc */}
      <path d="M8 6.1c-2.18 0-4.22.9-5.5 2.37.28.32.58.67.88 1.01 1.02-1.22 2.72-2.03 4.62-2.03s3.6.81 4.62 2.03c.3-.34.6-.69.88-1.01C12.22 7 10.18 6.1 8 6.1z" />
      {/* Bottom inner arc */}
      <path d="M8 9.9c-1.18 0-2.28.52-2.98 1.34.29.33.6.68.89 1.02.5-.6 1.25-.99 2.09-.99s1.59.39 2.09.99c.29-.34.6-.69.89-1.02-.7-.82-1.8-1.34-2.98-1.34z" />
      {/* Center dot */}
      <circle cx="8" cy="14" r="1.15" />
    </svg>
  );
};

export default MacWifiIcon;
