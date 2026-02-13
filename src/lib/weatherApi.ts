import { WeatherData, Location } from '@/types/weather';

const API_BASE_URL = '/api';

interface ApiResponse {
  success: boolean;
  data?: WeatherData;
  error?: string;
  cached?: boolean;
  cachedAt?: string;
  fetchedAt?: string;
}

export const fetchWeatherData = async (location: Location): Promise<WeatherData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather?code=${location.code}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Gagal mengambil data cuaca dari server');
    }
    
    const result: ApiResponse = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Data cuaca tidak valid');
    }
    
    // Log cache status di development
    if (process.env.NODE_ENV === 'development' && result.cached) {
      console.log(`✅ Data dari cache (${location.name})`);
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherDataClient = async (locationCode: string): Promise<WeatherData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather?code=${locationCode}`);
    
    if (!response.ok) {
      throw new Error('Gagal mengambil data cuaca');
    }
    
    const result: ApiResponse = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Data cuaca tidak valid');
    }
    
    // Log cache status di development
    if (process.env.NODE_ENV === 'development') {
      if (result.cached) {
        console.log(`✅ Cache hit untuk kode: ${locationCode}`);
      } else {
        console.log(`🔄 Fresh data untuk kode: ${locationCode}`);
      }
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Helper function untuk clear cache
export const clearWeatherCache = async (locationCode?: string): Promise<void> => {
  try {
    const url = locationCode 
      ? `${API_BASE_URL}/weather?code=${locationCode}`
      : `${API_BASE_URL}/weather`;
      
    await fetch(url, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};