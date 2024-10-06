import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const group_id = 1;
  const title = 'Sample Vote topic';
  const description = 'This is a sample description for the vote topic.';
  const options = [
    {
      name: 'Option 1',
			id: 1,
      votes: 0
    },
    {
      name: 'Option 2',
			id: 2,
      votes: 0
    },
    {
      name: 'Option 3',
			id: 3,
      votes: 0
    },
    {
      name: 'Option 4',
			id: 4,
      votes: 0
    }
  ];

  return NextResponse.json({ group_id, title, description, options });
}
