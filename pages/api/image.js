import axios from 'axios';
import NextCors from 'nextjs-cors';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

export default async function handler(req, res) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { imageUrl } = req.query;
  const { authorization } = req.headers;

  // Verify the bearer token
  if (authorization !== `Bearer ${SECRET_TOKEN}`) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'image/png', // Modify content type based on the image type
      },
    });

    const imageBuffer = Buffer.from(response.data, 'base64');
    res.setHeader('Content-Type', 'image/jpeg'); // Modify content type based on the image type
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Set cache control headers for better performance
    res.status(200).send(imageBuffer);
  } catch (error) {
    res.status(500).send('Error fetching or displaying the image');
  }
}
