'use client';

import { DistrictWeatherData } from '@/types/weather';
import { getCurrentWeather, getWeatherIcon, getWeatherDescription } from '@/lib/utils';
import { getVillageCount } from '@/lib/locations';

interface DistrictGridProps {
  districts: string[];
  districtWeatherData: DistrictWeatherData;
  onDistrictClick: (district: string) => void;
}

export default function DistrictGrid({
  districts,
  districtWeatherData,
  onDistrictClick,
}: DistrictGridProps) {
  return (
    <div className="mb-8">
      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
        Pilih Kecamatan
      </h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {districts.map((district, index) => {
          const villageCount = getVillageCount(district);
          const districtData = districtWeatherData[district];
          const districtCurrentWeather = districtData ? getCurrentWeather(districtData) : null;
          
          return (
            <div
              key={district}
              onClick={() => onDistrictClick(district)}
              className="glass-effect rounded-2xl p-6 district-card animate-slide-in cursor-pointer"
              style={{animationDelay: `${index * 0.05}s`}}
            >
              {districtCurrentWeather ? (
                <div>
                  <div className="text-6xl mb-3 text-center animate-float">
                    {getWeatherIcon(districtCurrentWeather.weather)}
                  </div>
                  <h4 className="text-white text-lg font-bold mb-2 text-center">
                    {district}
                  </h4>
                  <p className="text-white text-4xl font-bold mb-2 text-center">
                    {districtCurrentWeather.t}°
                  </p>
                  <p className="text-white/80 text-sm mb-3 text-center">
                    {getWeatherDescription(districtCurrentWeather.weather)}
                  </p>
                  <div className="flex justify-center gap-4 text-white/60 text-xs">
                    <span>💧 {districtCurrentWeather.hu}%</span>
                    <span>💨 {districtCurrentWeather.ws} km/h</span>
                  </div>
                  <p className="text-white/50 text-xs mt-3 text-center border-t border-white/10 pt-3">
                    {villageCount} kelurahan
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="animate-pulse-soft text-5xl mb-3">
                    🌤️
                  </div>
                  <h4 className="text-white text-lg font-bold mb-2">
                    {district}
                  </h4>
                  <p className="text-white/60 text-sm">
                    Memuat data...
                  </p>
                  <p className="text-white/50 text-xs mt-2">
                    {villageCount} kelurahan
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