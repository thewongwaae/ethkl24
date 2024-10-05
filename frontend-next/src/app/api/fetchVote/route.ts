import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const group_id = 1;
  const title = 'Sample Vote topic';
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

  return NextResponse.json({ group_id, title, description, options });
}
