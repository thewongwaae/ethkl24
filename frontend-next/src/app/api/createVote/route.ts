import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, description, options } = await request.json();

    if (!title || !description || !options) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const optionsArray = options.split(',').map((option: string) => option.trim());

    // Process the data as needed
    console.log({ title, description, optionsArray });

    return NextResponse.json({ title, description, optionsArray }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}