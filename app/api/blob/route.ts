import { NextResponse } from 'next/server';

// const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN!!;

export async function GET(req: Request, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url') as string;
    console.log(imageUrl)

    const response = await fetch(
      `http://localhost:3000/api/image?imageUrl=https://image.slidesharecdn.com/introductiontocprogrammingppt-230111102957-39c93ea1/75/introduction-to-c-programming-language-1-2048.jpg?cb=1673433414`,
    );
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURL = `data:${response.headers.get(
      'content-type',
    )};base64,${base64}`;

    return NextResponse.json({ dataURL }, { status: response.status });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch or convert the image. (OPPS!)',
    });
  }
}