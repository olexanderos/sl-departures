import { NextResponse } from 'next/server';
import axios from 'axios';
import { ApiResponse } from '@/lib/types';

export async function GET() {
  try {
    // Using built-in Next.js rewrite (configured in next.config.js)
    // which will forward to https://transport.integration.sl.se/v1/sites/9104/departures
    const response = await axios.get<ApiResponse>('https://transport.integration.sl.se/v1/sites/9104/departures');
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching departures:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departures data' },
      { status: 500 }
    );
  }
} 