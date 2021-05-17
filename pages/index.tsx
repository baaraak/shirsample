import { GetServerSideProps } from "next";
import Link from "next/link";
import { dateStripped } from "../lib/utils";

import Head from "next/head";
import React from "react";
import useUser from "../hooks/useUser";
import prisma from "../lib/prisma";

const Index = ({ samples }: any) => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Next.js Blog Example with</title>
      </Head>
      <>
        {samples.map((s) => (
          <Link key={s.id} href={`/${s.id}`}>
            {s.title}
          </Link>
        ))}
      </>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const samples = await prisma.sample.findMany({
    include: { user: { select: { name: true, id: true } } },
  });
  return {
    props: {
      samples: dateStripped(samples),
    },
  };
};
