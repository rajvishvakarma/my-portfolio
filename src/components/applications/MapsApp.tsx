'use client';

import React, { useState } from 'react';
import { Search, MapPin, Navigation, Star, Landmark, Compass, ZoomIn, ZoomOut, ChevronLeft } from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface LocationPreset {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lon: number;
  bbox: string;
}

const PRESET_LOCATIONS: LocationPreset[] = [
  {
    id: 'balaghat',
    name: 'Balaghat, Madhya Pradesh',
    category: 'Home / India',
    address: 'Balaghat, Madhya Pradesh 481001, India',
    lat: 21.8129,
    lon: 80.1838,
    bbox: '80.170%2C21.800%2C80.200%2C21.830',
  },
  {
    id: 'goldengate',
    name: 'Golden Gate Bridge',
    category: 'Landmark / USA',
    address: 'Golden Gate Bridge, San Francisco, CA 94129',
    lat: 37.8199,
    lon: -122.4783,
    bbox: '-122.490%2C37.812%2C-122.466%2C37.827',
  },
  {
    id: 'eiffel',
    name: 'Eiffel Tower',
    category: 'Monument / France',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
    lat: 48.8584,
    lon: 2.2945,
    bbox: '2.2845%2C48.8500%2C2.3045%2C48.8680',
  },
  {
    id: 'tokyo',
    name: 'Shibuya Crossing',
    category: 'City Center / Japan',
    address: 'Shibuya City, Tokyo 150-8010, Japan',
    lat: 35.6595,
    lon: 139.7004,
    bbox: '139.690%2C35.650%2C139.710%2C35.670',
  },
  {
    id: 'london',
    name: 'Big Ben & Parliament',
    category: 'Historic / UK',
    address: 'London SW1A 0AA, United Kingdom',
    lat: 51.5007,
    lon: -0.1246,
    bbox: '-0.135%2C51.495%2C-0.115%2C51.506',
  },
];

export const MapsApp: React.FC = () => {
  const { theme, addNotification, isMobile } = useDesktopStore();
  const isDarkMode = theme === 'dark';

  const [activeLocId, setActiveLocId] = useState('balaghat');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(14);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  const activeLocation =
    PRESET_LOCATIONS.find((l) => l.id === activeLocId) || PRESET_LOCATIONS[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = PRESET_LOCATIONS.find((l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      setActiveLocId(match.id);
      addNotification('Maps', `Navigating to ${match.name}`);
      if (isMobile) setMobileView('map');
    } else {
      addNotification('Maps', `Searching global locations for "${searchQuery}"…`);
    }
  };

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${activeLocation.bbox}&layer=mapnik&marker=${activeLocation.lat}%2C${activeLocation.lon}`;

  return (
    <div
      className={`h-full flex select-none ${
        isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Sidebar with Search and Destination Pins */}
      {(!isMobile || mobileView === 'list') && (
        <div
          className={`${isMobile ? 'w-full' : 'w-72'} shrink-0 flex flex-col border-r transition-colors ${
            isDarkMode ? 'bg-[#252528] border-white/10' : 'bg-[#f4f5f7] border-black/10'
          }`}
        >
        <div className="p-3">
          <form onSubmit={handleSearchSubmit}>
            <div
              className={`flex items-center gap-2 rounded-xl px-3 py-1.5 border text-xs ${
                isDarkMode
                  ? 'bg-white/10 border-white/10 text-white'
                  : 'bg-white border-black/10 text-neutral-900 shadow-xs'
              }`}
            >
              <Search size={14} className="opacity-50" />
              <input
                type="text"
                placeholder="Search Maps or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </form>
        </div>

        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider opacity-50">
          Saved Destinations
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {PRESET_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => {
                setActiveLocId(loc.id);
                addNotification('Maps', `Centered on ${loc.name}`);
                if (isMobile) setMobileView('map');
              }}
              className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-colors ${
                activeLocId === loc.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDarkMode
                  ? 'hover:bg-white/10'
                  : 'hover:bg-black/5'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                  activeLocId === loc.id
                    ? 'bg-white/20 text-white'
                    : 'bg-red-500/15 text-red-500'
                }`}
              >
                <MapPin size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="block text-xs font-semibold truncate">{loc.name}</strong>
                <span className="block text-[10px] opacity-75 truncate">{loc.category}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Location Info Card */}
        <div className="p-3 border-t border-white/10 text-xs">
          <p className="font-semibold">{activeLocation.name}</p>
          <p className="text-[11px] opacity-60 mt-0.5 line-clamp-2">{activeLocation.address}</p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => {
                if (isMobile) {
                  setMobileView('map');
                } else {
                  window.open(
                    `https://www.openstreetmap.org/search?query=${encodeURIComponent(activeLocation.name)}`,
                    '_blank'
                  );
                }
              }}
              className="flex-1 py-1.5 rounded-lg bg-blue-600 text-white font-medium text-[11px] text-center hover:bg-blue-700 transition"
            >
              Directions
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Main Map Viewport */}
      {(!isMobile || mobileView === 'map') && (
        <div className="flex-1 relative overflow-hidden bg-neutral-200 w-full h-full">
          {/* Mobile Back Button to list */}
          {isMobile && (
            <div className="absolute top-3 left-3 z-30">
              <button
                onClick={() => setMobileView('list')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#202020]/95 backdrop-blur-md text-xs font-semibold shadow-lg text-blue-600 dark:text-blue-400 border border-black/10 dark:border-white/10 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Destinations</span>
              </button>
            </div>
          )}

          <iframe
            title="Apple Maps View"
            src={mapSrc}
            className="w-full h-full border-none"
            loading="lazy"
          />

          {/* Mobile Bottom Banner */}
          {isMobile && (
            <div className="absolute bottom-3 inset-x-3 z-30 p-3 rounded-2xl bg-white/95 dark:bg-[#202020]/95 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-3">
                <p className="font-bold text-xs truncate text-neutral-900 dark:text-white">{activeLocation.name}</p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{activeLocation.address}</p>
              </div>
              <button
                onClick={() =>
                  window.open(
                    `https://www.openstreetmap.org/search?query=${encodeURIComponent(activeLocation.name)}`,
                    '_blank'
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shrink-0 active:scale-95 transition-all"
              >
                Directions
              </button>
            </div>
          )}

          {/* Floating Zoom and Compass Controls */}
          <div className="absolute right-4 bottom-18 md:bottom-4 flex flex-col gap-2 z-10">
            <div
              className={`rounded-xl shadow-lg border backdrop-blur-md overflow-hidden flex flex-col ${
                isDarkMode
                  ? 'bg-[#252528]/85 border-white/20 text-white'
                  : 'bg-white/90 border-black/10 text-neutral-800'
              }`}
            >
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 1, 19))}
                className="p-2 hover:bg-white/20 transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <div className="h-[1px] bg-white/15" />
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 1, 3))}
                className="p-2 hover:bg-white/20 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
