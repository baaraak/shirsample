import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, description } = req.body;

  const session = await getSession({ req });
  const result = await prisma.sample.create({
    data: {
      title,
      description,
      user: { connect: { id: session?.user?.id } },
    },
  });
  res.json(result);
}
