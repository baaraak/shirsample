import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import { createComment } from "../../lib/queries";

export default async (req, res) => {
  if (req.method === "POST") {
    const { body, sampleId } = req.body;

    const { user } = await getSession({ req });
    await createComment(body, user?.id, sampleId);
    res.json({ success: true });
  }
};
