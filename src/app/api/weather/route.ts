import { NextRequest, NextResponse } from 'next/server';

const BMKG_API_URL = 'https://api.bmkg.go.id/publik/prakiraan-cuaca';

interface CacheItem {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheItem>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 menit

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locationCode = searchParams.get('code');

    if (!locationCode) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Parameter code diperlukan' 
        },
        { status: 400 }
      );
    }

    // Check cache
    const cached = cache.get(locationCode);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      console.log(`Cache hit for location: ${locationCode}`);
      return NextResponse.json({
        success: true,
        data: cached.data,
        cached: true,
        cachedAt: new Date(cached.timestamp).toISOString(),
      });
    }

    // Fetch from BMKG API
    console.log(`Fetching from BMKG API for location: ${locationCode}`);
    const response = await fetch(`${BMKG_API_URL}?adm4=${locationCode}`, {
      headers: {
        'User-Agent': 'Cuaca-Pekanbaru-App/1.0'
      },
      // Timeout protection
      signal: AbortSignal.timeout(10000) // 10 detik timeout
    });

    if (!response.ok) {
      throw new Error(`BMKG API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Save to cache
    cache.set(locationCode, {
      data,
      timestamp: now
    });

    // Clean old cache entries (simple cleanup)
    if (cache.size > 100) {
      const entries = Array.from(cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      // Remove oldest 20 entries
      for (let i = 0; i < 20; i++) {
        cache.delete(entries[i][0]);
      }
    }

    return NextResponse.json({
      success: true,
      data,
      cached: false,
      fetchedAt: new Date(now).toISOString(),
    });

  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Gagal mengambil data cuaca',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Optional: Endpoint untuk clear cache
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locationCode = searchParams.get('code');

    if (locationCode) {
      cache.delete(locationCode);
      return NextResponse.json({
        success: true,
        message: `Cache cleared for location: ${locationCode}`
      });
    } else {
      cache.clear();
      return NextResponse.json({
        success: true,
        message: 'All cache cleared'
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false,
        error: error.message 
      },
      { status: 500 }
    );
  }
}
