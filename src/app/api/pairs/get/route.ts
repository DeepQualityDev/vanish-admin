'use server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json(); // get JSON body
    const { page_number, per_page } = body;   // destructure the values

    console.log('page_number:', page_number);
    console.log('per_page:', per_page);
    const url = new URL('http://160.202.131.23:8080/api/new_pairs');
    url.searchParams.append('page_number', page_number);
    url.searchParams.append('per_page', per_page);
    const res = await fetch(url.toString());
    const data = await res.json();

    return NextResponse.json(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message || 'Fetch failed' }, { status: 401 });
  }
}