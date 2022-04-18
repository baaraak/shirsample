import { getSession } from 'next-auth/react';
import { createSample } from '../../lib/queries';
import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';

let userSchema = object({
  url: string().url().required(),
  duration: string().required(),
  title: string().required(),
  description: string().optional(),
  language: string().optional(),
  genre: string().optional(),
});

// parse and assert validity
export default async function handle(
  req: NextApiRequest,
  res?: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      await userSchema.validate(req.body);
      const { url, duration, title, description, language, genre } = req.body;
      const session = await getSession({ req });
      const userId = session?.user?.id;
      if (!userId) throw new Error('User not logged in');
      const result = await createSample(
        { url, duration, title, description, language, genre },
        userId
      );
      res.status(200).json(result);
    } catch (err) {
      console.log({ err });
      return res.json({
        errors: err.errors || 'Server error',
      });
    }
  }
}
