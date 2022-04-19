import { NextApiRequest, NextApiResponse } from 'next';
import { string, object } from 'yup';
import { apiHandler } from '../../lib/api-handler';
import { createProposal } from '../../lib/queries';

let proposal = object({
  artist_name: string().required(),
  song_title: string().required(),
});

 async function create (req: NextApiRequest, res: NextApiResponse)  {
  
    try {
      if (!req.user) return res.status(401).end('Unauthenticated');
      await proposal.validate(req.body);
      const { artist_name, song_title } = req.body;

      await createProposal(artist_name, song_title, req.user.id);
      res.json({ success: true });
    } catch (err) {
      return res.json({
        errors: err.errors || 'Server error',
      });
    }
  }
};


export default apiHandler({
  post: create,
});
