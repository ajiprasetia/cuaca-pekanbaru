'use client';

import { ViewMode } from '@/types/weather';
import Link from 'next/link';

interface HeaderProps {
  currentTime: Date;
  viewMode: ViewMode;
  selectedDistrict: string | null;
  selectedVillage: { name: string; district: string } | null;
}

export default function Header({
  currentTime,
  viewMode,
  selectedDistrict,
  selectedVillage,
}: HeaderProps) {
  return (
    <header className="mb-12 animate-slide-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            Cuaca Pekanbaru
          </h1>
          <p className="text-white/80 text-lg">
            {currentTime.toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-white/60 text-sm mt-1">
            Data dari BMKG Indonesia • 83 Kelurahan • 15 Kecamatan
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div>
        <div className="text-white/90 text-sm font-medium flex items-center gap-2 flex-wrap">
          <Link 
            href="/" 
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            Pekanbaru
          </Link>
          
          {viewMode !== 'overview' && selectedDistrict && (
            <>
              <span className="breadcrumb-arrow">›</span>
              <Link 
                href={`/district/${encodeURIComponent(selectedDistrict)}`}
                className="opacity-90 hover:opacity-100 transition-opacity"
              >
                {selectedDistrict}
              </Link>
            </>
          )}
          
          {viewMode === 'village' && selectedVillage && (
            <>
              <span className="breadcrumb-arrow">›</span>
              <span className="font-bold">{selectedVillage.name}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
