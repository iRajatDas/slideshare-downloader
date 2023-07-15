import { NextResponse } from 'next/server';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

export async function GET(req: Request, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url') as string;
    const authorizationHeader = req.headers.get('Authorization');

    // Check if the provided authorization header matches the expected secret token
    if (authorizationHeader !== `Bearer ${SECRET_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURL = `data:${response.headers.get(
      'content-type',
    )};base64,${base64}`;

    return NextResponse.json({ dataURL }, { status: response.status });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch or convert the image.',
    });
  }
}
