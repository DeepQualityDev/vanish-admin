'use server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const res = await fetch('http://160.202.131.23:8080/api/new_pairs');
    const data = await res.json();

    return NextResponse.json(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message || 'Fetch failed' }, { status: 401 });
  }
}