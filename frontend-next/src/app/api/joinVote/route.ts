import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // CHECK IF VOTE ID EXISTS IN DB (IGNORE FOR NOW)
  // IF EXISTS, FETCH VOTE TOPIC (ASSUME THIS IS THE CASE)
  // ELSE, RETURN ERROR

  const { searchParams } = new URL(request.url);
  const voteId = searchParams.get('id');

  // CHECK EXISTANCE OF ID IN DB HERE
  // if (voteId && db.has(voteId)) {
  //   const voteTopic = db.get(voteId);
  //   return NextResponse.json({ voteId, voteTopic });
  // }

  const voteTopic = 'Sample Vote Topic';
  return NextResponse.json({ voteId, voteTopic });
  // IF NOT FOUND, 404
  return NextResponse.json({ error: 'Vote group does not exist' }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const { voteTopic } = await request.json();

  const generateVoteId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const voteId = generateVoteId(5);

  // CHECK IF VOTE ID ALREADY EXISTS IN DB
  // IF EXISTS, GENERATE NEW VOTE ID
  // const VoteId = generateVoteId(5);

  return NextResponse.json({ voteId, voteTopic });
}