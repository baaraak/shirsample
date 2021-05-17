import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import { createSample } from "../../../lib/queries";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, description } = req.body;

  const session = await getSession({ req });
  const result = await createSample({ title, description }, session?.user?.id);
  res.json(result);
}
