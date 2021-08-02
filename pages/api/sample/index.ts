import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import { createSample } from "../../../lib/queries";

export const config = {
  api: {
    bodyParser: false,
  },
};
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  if (req.method === "POST") {
    console.log(req.body.myFile);

    const { title, description, language, genre, sample } = req.body;

    console.log({ title, description, language, genre, sample });
    return res.json(true);
    // // const session = await getSession({ req });
    // // const result = await createSample(
    // //   { title, description },
    // //   session?.user?.id
    // // );
    // res.json(result);
  }
}
