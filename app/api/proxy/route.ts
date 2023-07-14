import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    console.log(url);

    const response = await axios.get(url as string, { responseType: 'blob' });

    return new Response(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to proxy the request' });
  }
}
