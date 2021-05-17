import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import prisma from "../../lib/prisma";
import { dateStripped } from "../../lib/utils";

export default function Profile({ user }) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { name, bio };
      await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
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
