import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma";
import { sendVerificationRequest } from "../../../lib/mailer";
import { updateUser } from "../../../lib/queries";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  // debug: true,
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: "admin@example.com",
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.user = user;
      return Promise.resolve(session);
    },
  },
  events: {
    createUser: async (user) => {
      if (!user.name) {
        updateUser(user.id, { name: user.email.split("@")[0] });
      }
      console.log("event user:", user);
    },
  },
  pages: {
    newUser: "/profile",
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
};
