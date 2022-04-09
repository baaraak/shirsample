import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { createProposal } from '../../lib/queries';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { artist_name, song_title, sampleId } = req.body;

    const { user } = await getSession({ req });
    await createProposal({ artist_name, song_title }, user?.id, sampleId);
    res.json({ success: true });
  }
};
