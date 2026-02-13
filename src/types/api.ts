import { WeatherData } from './weather';

/**
 * Standard API Response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Weather API Response
 */
export interface WeatherApiResponse extends ApiResponse<WeatherData> {
  cached?: boolean;
  cachedAt?: string;
  fetchedAt?: string;
}

/**
 * Districts API Response
 */
export interface DistrictsApiResponse extends ApiResponse {
  districts?: string[];
  count?: number;
}

/**
 * Villages API Response
 */
export interface VillagesApiResponse extends ApiResponse {
  district?: string;
  villages?: Array<{
    name: string;
    code: string;
    district: string;
  }>;
  count?: number;
}

/**
 * Health Check Response
 */
export interface HealthCheckResponse extends ApiResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  services: {
    api: 'healthy' | 'unhealthy';
    bmkg: {
      status: 'healthy' | 'unhealthy';
      responseTime?: string;
      statusCode?: number;
      error?: string;
    };
  };
  version: string;
}
