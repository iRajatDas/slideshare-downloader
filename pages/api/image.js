// pages/api/image.js
import axios from 'axios';

export default async function handler(req, res) {
  const { imageUrl } = req.query;

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'image/jpeg', // Modify content type based on the image type
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
