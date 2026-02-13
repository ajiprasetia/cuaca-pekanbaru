'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import CurrentWeather from '@/components/CurrentWeather';
import DateWeatherForecast from '@/components/DateWeatherForecast';
import LoadingState from '@/components/LoadingState';
import { 
  LOCATIONS
} from '@/lib/locations';
import { fetchWeatherDataClient } from '@/lib/weatherApi';
import { getCurrentWeather } from '@/lib/utils';
import { WeatherData } from '@/types/weather';

export default function VillagePage() {
  const params = useParams();
  const villageCode = params.villageCode as string;
  
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Find village info by code
  const village = LOCATIONS.find(loc => loc.code === villageCode);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data on mount
  useEffect(() => {
    if (village) {
      fetchWeatherData();
    }
  }, [villageCode]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherDataClient(villageCode);
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message || 'Gagal mengambil data cuaca');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentWeather = getCurrentWeather(weatherData);

  if (!village) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="glass-effect rounded-2xl p-6">
          <p className="text-white">Kelurahan tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-float" 
        style={{animationDelay: '2s'}}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <Header
          currentTime={currentTime}
          viewMode="village"
          selectedDistrict={village.district}
          selectedVillage={{
            name: village.name,
            district: village.district
          }}
        />

        {loading && <LoadingState />}
        
        {error && (
          <LoadingState 
            error={error} 
            onRetry={fetchWeatherData}
          />
        )}

        {!loading && !error && currentWeather && (
          <>
            <CurrentWeather
              currentWeather={currentWeather}
              locationName={village.name}
              locationSubtitle={`Kec. ${village.district}`}
            />
            
            <DateWeatherForecast weatherData={weatherData} />
          </>
        )}

        {/* Footer */}
        <footer
          className="mt-16 pt-8 border-t border-white/20 text-center animate-slide-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-white/80 text-sm">
            Dibuat dengan menggunakan{" "}
            <a
              href="https://data.bmkg.go.id/prakiraan-cuaca/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold hover:text-white transition"
            >
              data resmi BMKG
            </a>
          </p>
          <p className="text-white/60 text-xs mt-2 mb-6">
            Pembaruan otomatis setiap kali lokasi berubah
          </p>
        </footer>
      </div>
    </div>
  );
}