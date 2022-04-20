import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { createSample } from 'lib/queries';
import { apiHandler } from 'lib/api-handler';
import { getSamples } from '../../lib/queries';

const userSchema = object({
  url: string().url().required(),
  duration: string().required(),
  title: string().required(),
  description: string().optional(),
  language: string().optional(),
  genre: string().optional(),
});

async function create(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.user) return res.status(401).end('Unauthenticated');
    await userSchema.validate(req.body);
    const { url, duration, title, description, language, genre } = req.body;

    const result = await createSample(
      { url, duration, title, description, language, genre },
      req.user.id
    );
    res.status(200).json(result);
  } catch (err) {
    return res.json({
      errors: err.errors || 'Server error',
    });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('***********************');
    console.log(req.query);
    console.log('***********************');
    const result = await getSamples(req.query);
    res.status(200).json(result);
  } catch (err) {
    return res.json({
      errors: err.errors || 'Server error',
    });
  }
}

export default apiHandler({
  post: create,
  get,
});
