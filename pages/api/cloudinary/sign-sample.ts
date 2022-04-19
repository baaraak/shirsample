const cloudinary = require('cloudinary').v2;
import { NextApiResponse, NextApiRequest } from 'next';
import { CLOUDINARY_SAMPLES_FOLDER_NAME } from 'lib/constants';

export default function signature(req: NextApiRequest, res: NextApiResponse) {
  // Get the timestamp in seconds
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Get the signature using the Node.js SDK method api_sign_request
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: CLOUDINARY_SAMPLES_FOLDER_NAME,
      format: 'mp3',
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
}
