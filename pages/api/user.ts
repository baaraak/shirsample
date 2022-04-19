import { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiHandler } from 'lib/api-handler';
import { updateUser } from 'lib/queries';

const user = object({
  name: string().optional(),
  bio: string().optional(),
  image: string().optional(),
});

async function update(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.user) return res.status(401).end('Unauthenticated');
    await user.validate(req.body);
    const { name, bio, image } = req.body;

    const updatedUser = await updateUser(req.user.id, {
      name,
      bio,
      image,
    });
    res.json(updatedUser);
  } catch (err) {
    return res.json({
      errors: err.errors || 'Server error',
    });
  }
}

export default apiHandler({
  path: update,
});
