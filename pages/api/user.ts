import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { updateUser } from '../../lib/queries';

export default async (req, res) => {
  if (req.method === 'PATCH') {
    const { name, bio } = req.body;

    // const { user } = await getSession({ req });
    const updatedUser = await updateUser('312', { name, bio });
    res.json(updatedUser);
  }
};
