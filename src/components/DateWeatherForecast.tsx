'use client';

import { useState } from 'react';
import { WeatherData } from '@/types/weather';
import { getWeatherIcon, getWeatherDescription, getWindDirection } from '@/lib/utils';

interface DateWeatherForecastProps {
  weatherData: WeatherData | null;
}

const formatDateTab = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
};

const formatFullDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatHourTime = (dateTimeString: string): string => {
  if (!dateTimeString) return '00.00';
  
  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return '00.00';
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}.${minutes}`;
};

export default function DateWeatherForecast({ weatherData }: DateWeatherForecastProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  if (!weatherData?.data?.[0]?.cuaca) return null;

  // Ambil array cuaca yang berisi array per hari
  const dailyDataArrays = weatherData.data[0].cuaca;
  
  // Data per jam untuk hari yang dipilih
  const hourlyData = dailyDataArrays[selectedDateIndex] || [];
  
  // Ambil tanggal dari jam pertama
  const dateString = hourlyData[0]?.local_datetime || '';

  return (
    <div className="mb-8 animate-slide-in" style={{animationDelay: '0.2s'}}>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
        Prakiraan Cuaca {formatFullDate(dateString)}
      </h3>
      
      <div className="glass-effect rounded-3xl p-6 overflow-hidden">
        {/* Tab Tanggal */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {dailyDataArrays.map((dayHours, index) => {
              const isSelected = index === selectedDateIndex;
              const firstHour = dayHours[0];
              const dayDate = firstHour?.local_datetime || '';
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDateIndex(index)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    isSelected 
                      ? 'bg-white text-purple-600 shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {formatDateTab(dayDate)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Prakiraan Per Jam */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {hourlyData.map((hour, index) => {
            const timeString = formatHourTime(hour.local_datetime);
            
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 min-w-[200px] flex-shrink-0 backdrop-blur-sm border border-white/10"
              >
                {/* Waktu */}
                <p className="text-white text-xl font-bold mb-1">
                  {timeString} WIB
                </p>
                
                {/* Icon & Suhu */}
                <div className="flex items-center justify-center my-4">
                  <div className="text-6xl mr-3">
                    {getWeatherIcon(hour.weather)}
                  </div>
                  <div className="text-5xl font-bold text-white">
                    {hour.t}°C
                  </div>
                </div>
                
                {/* Deskripsi Cuaca */}
                <p className="text-white text-lg font-semibold mb-4 text-center">
                  {getWeatherDescription(hour.weather)}
                </p>
                
                {/* Detail Cuaca */}
                <div className="space-y-3 text-sm">
                  {/* Kelembaban */}
                  <div className="flex items-center text-white/80">
                    <span className="mr-2">💧</span>
                    <span className="ml-auto font-medium">{hour.hu}%</span>
                  </div>
                  
                  {/* Kecepatan Angin */}
                  <div className="flex items-center text-white/80">
                    <span className="mr-2">💨</span>
                    <span className="ml-auto font-medium">{hour.ws} km/jam</span>
                  </div>
                  
                  {/* Arah Angin */}
                  <div className="flex items-center text-white/80">
                    <span className="mr-2">🧭</span>
                    <span className="ml-auto font-medium">{getWindDirection(hour.wd_to)}</span>
                  </div>
                  
                  {/* Jarak Pandang */}
                  <div className="flex items-center text-white/80">
                    <span className="mr-2">👁️</span>
                    <span className="ml-auto font-medium">{hour.vs_text}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {hourlyData.length === 0 && (
          <p className="text-white/70 text-center">Tidak ada data prakiraan per jam</p>
        )}
        
        <p className="text-white/50 text-xs text-center mt-4">
          ← Geser untuk melihat lebih banyak →
        </p>
      </div>
    </div>
  );
}