import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const userId = crypto.randomUUID();
    const body = await req.json();
    const userName = `${body.firstname} ${body.lastname}`;

    return NextResponse.json({
      status: 200,
      userId,
      userName,
      message: 'Signed Up Successfully',
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Error processing request',
    });
  }
}
