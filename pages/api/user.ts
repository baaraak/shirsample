import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  if (req.method === "PATCH") {
    const { name, bio } = req.body;

    const { user } = await getSession({ req });
    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        bio,
      },
    });
    res.json(updateUser);
  }
};
