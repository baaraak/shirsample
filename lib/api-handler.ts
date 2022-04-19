import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export function apiHandler(handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = String(req.method).toLowerCase();

    // check handler supports HTTP method
    if (!handler[method]) return res.status(404).end('Not Found');

    try {
      // if user authenticated, add user to request
      const session = await getSession({ req });
      req.user = session?.user;

      // route handler
      return handler[method](req, res);
    } catch (err) {
      return res.status(500).end(`Something went wrong`);
    }
  };
}
