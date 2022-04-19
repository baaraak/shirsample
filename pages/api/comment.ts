import { NextApiRequest, NextApiResponse } from 'next';
import { string, object } from 'yup';
import { apiHandler } from '../../lib/api-handler';
import { createComment } from '../../lib/queries';

let comment = object({
  body: string().required(),
  parentId: string(),
});

async function create(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.user) return res.status(401).end('Unauthenticated');
    await comment.validate(req.body);
    const { body, parentId } = req.body;

    await createComment(body, req.user.id, parentId);
    res.json({ success: true });
  } catch (err) {
    return res.json({
      errors: err.errors || 'Server error',
    });
  }
}

export default apiHandler({
  post: create,
});
