import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const id = 1;
  const topic = 'Sample Vote Topic';
  const description = 'This is a sample description for the vote topic.';
  const options = [
    {
      name: 'Option 1',
      votes: 0
    },
    {
      name: 'Option 2',
      votes: 3
    }
  ];

  return NextResponse.json({ id, topic, description, options });
}