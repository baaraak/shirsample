import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import { updateUser } from "../../lib/queries";

export default async (req, res) => {
  if (req.method === "PATCH") {
    const { name, bio } = req.body;

    const { user } = await getSession({ req });
    const updatedUser = await updateUser(user, { name, bio });
    res.json(updatedUser);
  }
};
