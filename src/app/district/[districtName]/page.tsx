'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import VillageGrid from '@/components/VillageGrid';
import { 
  LOCATIONS, 
  getVillagesByDistrict
} from '@/lib/locations';
import { fetchWeatherDataClient } from '@/lib/weatherApi';
import { 
  Location,
  VillageWeatherData
} from '@/types/weather';

export default function DistrictPage() {
  const router = useRouter();
  const params = useParams();
  const districtName = decodeURIComponent(params.districtName as string);
  
  const [villageWeatherData, setVillageWeatherData] = useState<VillageWeatherData>({});
  const [currentTime, setCurrentTime] = useState(new Date());

  const villagesInDistrict = getVillagesByDistrict(districtName);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather for all villages on mount
  useEffect(() => {
    villagesInDistrict.forEach(village => {
      fetchVillageWeather(village);
    });
  }, [districtName]);

  const fetchVillageWeather = async (village: Location) => {
    try {
      const data = await fetchWeatherDataClient(village.code);
      setVillageWeatherData(prev => ({
        ...prev,
        [village.code]: data
      }));
    } catch (err) {
      console.error(`Error fetching weather for ${village.name}:`, err);
    }
  };

  const handleVillageClick = (village: Location) => {
    router.push(`/village/${village.code}`);
  };

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
          viewMode="district"
          selectedDistrict={districtName}
          selectedVillage={null}
        />

        <VillageGrid
          villages={villagesInDistrict}
          villageWeatherData={villageWeatherData}
          selectedDistrict={districtName}
          onVillageClick={handleVillageClick}
        />

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