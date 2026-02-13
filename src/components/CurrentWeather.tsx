'use client';

import { CurrentWeather as CurrentWeatherType } from '@/types/weather';
import { getWeatherIcon, getWeatherDescription, getWindDirection } from '@/lib/utils';

interface CurrentWeatherProps {
  currentWeather: CurrentWeatherType;
  locationName: string;
  locationSubtitle?: string;
}

export default function CurrentWeather({
  currentWeather,
  locationName,
  locationSubtitle = 'Riau, Indonesia',
}: CurrentWeatherProps) {
  return (
    <div className="mb-8 animate-slide-in">
      <div className="glass-effect rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-8xl animate-float">
                {getWeatherIcon(currentWeather.weather)}
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                  {locationName}
                </h2>
                <p className="text-white/70 text-lg">
                  {locationSubtitle}
                </p>
              </div>
            </div>
            
            <div className="temp-display text-white mb-4">
              {currentWeather.t}°
            </div>
            
            <p className="text-2xl md:text-3xl text-white/90 font-semibold mb-6">
              {getWeatherDescription(currentWeather.weather)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="text-3xl mb-2">💧</div>
              <p className="text-white/70 text-sm mb-1">Kelembaban</p>
              <p className="text-white text-2xl font-bold">{currentWeather.hu}%</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="text-3xl mb-2">💨</div>
              <p className="text-white/70 text-sm mb-1">Kecepatan Angin</p>
              <p className="text-white text-2xl font-bold">{currentWeather.ws} km/h</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="text-3xl mb-2">🧭</div>
              <p className="text-white/70 text-sm mb-1">Arah Angin dari</p>
              <p className="text-white text-2xl font-bold">{getWindDirection(currentWeather.wd_to)}</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="text-3xl mb-2">👁️</div>
              <p className="text-white/70 text-sm mb-1">Jarak Pandang</p>
              <p className="text-white text-2xl font-bold">{currentWeather.vs_text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}