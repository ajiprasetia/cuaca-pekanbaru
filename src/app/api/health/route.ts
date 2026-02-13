import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const BMKG_API_URL = 'https://api.bmkg.go.id/publik/prakiraan-cuaca';
    
    // Check BMKG API availability
    const startTime = Date.now();
    const response = await fetch(`${BMKG_API_URL}?adm4=1471010001`, {
      signal: AbortSignal.timeout(5000) // 5 detik timeout
    });
    const responseTime = Date.now() - startTime;

    const bmkgStatus = response.ok ? 'healthy' : 'unhealthy';

    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        bmkg: {
          status: bmkgStatus,
          responseTime: `${responseTime}ms`,
          statusCode: response.status
        }
      },
      version: '1.0.0'
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
        services: {
          api: 'healthy',
          bmkg: {
            status: 'unhealthy',
            error: error.message
          }
        }
      },
      { status: 503 }
    );
  }
}
