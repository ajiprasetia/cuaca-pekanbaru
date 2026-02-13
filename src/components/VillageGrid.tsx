'use client';

import { Location, VillageWeatherData } from '@/types/weather';
import { getCurrentWeather, getWeatherIcon, getWeatherDescription } from '@/lib/utils';

interface VillageGridProps {
  villages: Location[];
  villageWeatherData: VillageWeatherData;
  selectedDistrict: string;
  onVillageClick: (village: Location) => void;
}

export default function VillageGrid({
  villages,
  villageWeatherData,
  selectedDistrict,
  onVillageClick,
}: VillageGridProps) {
  return (
    <div className="mb-8">
      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
        Kelurahan di Kecamatan {selectedDistrict}
      </h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {villages.map((village, index) => {
          const villageData = villageWeatherData[village.code];
          const villageCurrentWeather = villageData ? getCurrentWeather(villageData) : null;
          
          return (
            <div
              key={village.code}
              onClick={() => onVillageClick(village)}
              className="glass-effect rounded-2xl p-6 district-card animate-slide-in cursor-pointer"
              style={{animationDelay: `${index * 0.05}s`}}
            >
              {villageCurrentWeather ? (
                <div>
                  <div className="text-6xl mb-3 text-center animate-float">
                    {getWeatherIcon(villageCurrentWeather.weather)}
                  </div>
                  <h4 className="text-white text-lg font-bold mb-2 text-center">
                    {village.name}
                  </h4>
                  <p className="text-white text-4xl font-bold mb-2 text-center">
                    {villageCurrentWeather.t}°
                  </p>
                  <p className="text-white/80 text-sm mb-3 text-center">
                    {getWeatherDescription(villageCurrentWeather.weather)}
                  </p>
                  <div className="flex justify-center gap-4 text-white/60 text-xs">
                    <span>💧 {villageCurrentWeather.hu}%</span>
                    <span>💨 {villageCurrentWeather.ws} km/h</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="animate-pulse-soft text-5xl mb-3">
                    🌤️
                  </div>
                  <h4 className="text-white text-lg font-bold mb-2">
                    {village.name}
                  </h4>
                  <p className="text-white/60 text-sm">
                    Memuat data...
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}