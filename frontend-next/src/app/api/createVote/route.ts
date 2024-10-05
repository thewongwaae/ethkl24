import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, description, options } = await request.json();

    if (!title || !description || !options) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const optionsArray = options.split(',').map((option: string) => ({
      name: option.trim(),
      votes: 0
    }));

    // Process the data as needed
    const id = '1';
    console.log({ id, title, description, optionsArray });

    return NextResponse.json({ id, title, description, optionsArray }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}