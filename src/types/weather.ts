export interface Location {
  name: string;
  code: string;
  district: string;
}

export interface WeatherData {
  data: DayWeather[];
}

export interface DayWeather {
  local_datetime: string;
  cuaca: WeatherHour[][];
}

export interface WeatherHour {
  local_datetime: string;
  t: number; // temperature
  weather: number; // weather code
  hu: number; // humidity
  ws: number; // wind speed
  wd_to: string | number; // wind direction
  vs_text: string; // visibility text
}

export interface CurrentWeather extends WeatherHour {}

export interface HourlyWeather extends WeatherHour {}

export interface DailyWeather {
  date: string;
  weather: number;
  description: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export type ViewMode = 'overview' | 'district' | 'village';

export interface DistrictWeatherData {
  [districtName: string]: WeatherData;
}

export interface VillageWeatherData {
  [villageCode: string]: WeatherData;
}