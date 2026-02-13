"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CurrentWeather from "@/components/CurrentWeather";
import DistrictGrid from "@/components/DistrictGrid";
import {
  LOCATIONS,
  DEFAULT_PEKANBARU_LOCATION,
  getDistricts,
} from "@/lib/locations";
import { fetchWeatherDataClient } from "@/lib/weatherApi";
import { getCurrentWeather } from "@/lib/utils";
import { WeatherData, DistrictWeatherData } from "@/types/weather";

export default function Home() {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [districtWeatherData, setDistrictWeatherData] =
    useState<DistrictWeatherData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const districts = getDistricts();

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load overview data on mount
  useEffect(() => {
    fetchWeatherData(DEFAULT_PEKANBARU_LOCATION);

    // Fetch weather for all districts on mount
    districts.forEach((district) => {
      fetchDistrictWeather(district);
    });
  }, []);

  const fetchWeatherData = async (
    location: typeof DEFAULT_PEKANBARU_LOCATION,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherDataClient(location.code);
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message || "Gagal mengambil data cuaca");
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDistrictWeather = async (districtName: string) => {
    const representativeVillage = LOCATIONS.find(
      (loc) => loc.district === districtName,
    );
    if (!representativeVillage) return;

    try {
      const data = await fetchWeatherDataClient(representativeVillage.code);
      setDistrictWeatherData((prev) => ({
        ...prev,
        [districtName]: data,
      }));
    } catch (err) {
      console.error(`Error fetching weather for ${districtName}:`, err);
    }
  };

  const handleDistrictClick = (district: string) => {
    router.push(`/district/${encodeURIComponent(district)}`);
  };

  const currentWeather = getCurrentWeather(weatherData);

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <Header
          currentTime={currentTime}
          viewMode="overview"
          selectedDistrict={null}
          selectedVillage={null}
        />

        {/* OVERVIEW MODE */}
        {!loading && !error && currentWeather && (
          <CurrentWeather
            currentWeather={currentWeather}
            locationName="Kota Pekanbaru"
            locationSubtitle="Riau, Indonesia"
          />
        )}

        <DistrictGrid
          districts={districts}
          districtWeatherData={districtWeatherData}
          onDistrictClick={handleDistrictClick}
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
