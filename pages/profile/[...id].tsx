import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import useUser from "../../hooks/useUser";
import prisma from "../../lib/prisma";
import { dateStripped } from "../../lib/utils";

export default function UserProfile({ user }) {
  return <div>{user.name}</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = Number(params.id[0]);

  if (!Number.isInteger(id))
    return {
      redirect: {
        destination: "/",
      },
    };
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      samples: true,
    },
  });

  return {
    props: {
      user: dateStripped(user),
    },
  };
};
