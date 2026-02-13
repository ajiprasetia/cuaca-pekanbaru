import { NextRequest, NextResponse } from 'next/server';
import { LOCATIONS, getDistricts, getVillagesByDistrict } from '@/lib/locations';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const districtName = searchParams.get('name');

    // Jika ada parameter name, return villages di district tersebut
    if (districtName) {
      const villages = getVillagesByDistrict(districtName);
      
      if (villages.length === 0) {
        return NextResponse.json(
          { 
            success: false,
            error: `District '${districtName}' tidak ditemukan` 
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        district: districtName,
        villages: villages,
        count: villages.length
      });
    }

    // Jika tidak ada parameter, return semua districts
    const districts = getDistricts();
    
    return NextResponse.json({
      success: true,
      districts: districts,
      count: districts.length
    });

  } catch (error: any) {
    console.error('Error getting districts:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Gagal mengambil data kecamatan' 
      },
      { status: 500 }
    );
  }
}
