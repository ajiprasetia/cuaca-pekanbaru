import { WeatherData, CurrentWeather, HourlyWeather, DailyWeather } from '@/types/weather';

export const weatherIcons: { [key: number]: string } = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  4: '🌥️',
  5: '🌦️',
  10: '🌫️',
  45: '🌫️',
  60: '🌧️',
  61: '🌧️',
  63: '🌧️',
  80: '🌧️',
  95: '⛈️',
  97: '⛈️',
};

export const getWeatherIcon = (code: number): string => {
  return weatherIcons[code] || '🌤️';
};

export const getWeatherDescription = (code: number): string => {
  const descriptions: { [key: number]: string } = {
    0: 'Cerah',
    1: 'Cerah Berawan',
    2: 'Berawan',
    3: 'Berawan Tebal',
    4: 'Berawan',
    5: 'Hujan Ringan',
    10: 'Berkabut',
    45: 'Berkabut',
    60: 'Hujan',
    61: 'Hujan Sedang',
    63: 'Hujan Lebat',
    80: 'Hujan Lokal',
    95: 'Hujan Petir',
    97: 'Hujan Petir',
  };
  return descriptions[code] || 'Tidak Diketahui';
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Tanggal tidak tersedia';
  
  let date: Date;
  if (dateString.length === 8 && !dateString.includes('-')) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    date = new Date(`${year}-${month}-${day}`);
  } else {
    date = new Date(dateString);
  }
  
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

export const getCurrentWeather = (data: WeatherData | null): CurrentWeather | null => {
  if (!data?.data?.[0]?.cuaca?.[0]) return null;
  
  const now = new Date();
  const today = data.data[0];
  const currentHour = now.getHours();
  
  const weatherArray = today.cuaca[0];
  let closestWeather = weatherArray[0];
  let minDiff = Math.abs(new Date(weatherArray[0].local_datetime).getHours() - currentHour);
  
  for (let weather of weatherArray) {
    const weatherHour = new Date(weather.local_datetime).getHours();
    const diff = Math.abs(weatherHour - currentHour);
    if (diff < minDiff) {
      minDiff = diff;
      closestWeather = weather;
    }
  }
  
  return closestWeather;
};

export const getHourlyForecast = (weatherData: WeatherData | null): HourlyWeather[] => {
  if (!weatherData?.data?.[0]?.cuaca?.[0]) return [];
  
  const allData = weatherData.data[0].cuaca[0];
  const hourlyData: HourlyWeather[] = [];
  const seenHours = new Set<number>();
  
  const now = new Date();
  const currentHour = now.getHours();
  
  for (let weather of allData) {
    const weatherDate = new Date(weather.local_datetime);
    const weatherHour = weatherDate.getHours();
    
    if (!seenHours.has(weatherHour) && weatherHour >= currentHour) {
      hourlyData.push(weather);
      seenHours.add(weatherHour);
      
      if (hourlyData.length >= 12) break;
    }
  }
  
  if (hourlyData.length < 12 && weatherData.data[1]?.cuaca?.[0]) {
    const nextDayData = weatherData.data[1].cuaca[0];
    for (let weather of nextDayData) {
      const weatherDate = new Date(weather.local_datetime);
      const weatherHour = weatherDate.getHours();
      
      if (!seenHours.has(weatherHour)) {
        hourlyData.push(weather);
        seenHours.add(weatherHour);
        
        if (hourlyData.length >= 12) break;
      }
    }
  }
  
  return hourlyData;
};

export const getWindDirection = (direction: string | number | undefined | null): string => {
  if (direction === undefined || direction === null) {
    return 'N/A';
  }
  
  // Jika input adalah string (kode arah dari API BMKG)
  if (typeof direction === 'string') {
    const directionMap: { [key: string]: string } = {
      'N': 'Utara',
      'NE': 'Timur Laut',
      'E': 'Timur',
      'SE': 'Tenggara',
      'S': 'Selatan',
      'SW': 'Barat Daya',
      'W': 'Barat',
      'NW': 'Barat Laut',
      // Variasi lain yang mungkin
      'NORTH': 'Utara',
      'NORTHEAST': 'Timur Laut',
      'EAST': 'Timur',
      'SOUTHEAST': 'Tenggara',
      'SOUTH': 'Selatan',
      'SOUTHWEST': 'Barat Daya',
      'WEST': 'Barat',
      'NORTHWEST': 'Barat Laut',
    };
    return directionMap[direction.toUpperCase()] || direction;
  }
  
  // Jika input adalah number (derajat)
  if (typeof direction === 'number' && !isNaN(direction)) {
    const directions = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
    const index = Math.round(direction / 45) % 8;
    return directions[index];
  }
  
  return 'N/A';
};

export const getDailyForecast = (weatherData: WeatherData | null): DailyWeather[] => {
  if (!weatherData?.data) return [];
  
  const dailyData = weatherData.data.slice(0, 5).map(day => {
    if (!day.cuaca?.[0]) return null;
    
    const middayWeather = day.cuaca[0].reduce((closest, current) => {
      const currentHour = new Date(current.local_datetime).getHours();
      const closestHour = new Date(closest.local_datetime).getHours();
      const targetHour = 12;
      
      if (Math.abs(currentHour - targetHour) < Math.abs(closestHour - targetHour)) {
        return current;
      }
      return closest;
    }, day.cuaca[0][0]);
    
    const temps = day.cuaca[0].map(w => w.t);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    const avgHumidity = Math.round(
      day.cuaca[0].reduce((sum, w) => sum + w.hu, 0) / day.cuaca[0].length
    );
    
    return {
      date: day.local_datetime,
      weather: middayWeather.weather,
      description: getWeatherDescription(middayWeather.weather),
      temp: middayWeather.t,
      minTemp,
      maxTemp,
      humidity: avgHumidity,
      windSpeed: middayWeather.ws,
      icon: getWeatherIcon(middayWeather.weather)
    };
  }).filter((day): day is DailyWeather => day !== null);
  
  return dailyData;
};