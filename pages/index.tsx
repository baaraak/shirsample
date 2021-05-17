import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import Logo from "../components/Logo";
import useUser from "../hooks/useUser";
import prisma from "../lib/prisma";

const Index = ({ samples }: any) => {
  const user = useUser();
  console.log({ samples, user });

  return (
    <>
      <Head>
        <title>Next.js Blog Example with</title>
      </Head>
      <div className="flex justify-center py-8 max-w-6xl m-auto border border-t-0 border-gray-200 border-b-0 h-screen">
        <Logo />
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const samples = await prisma.sample.findMany();
  return {
    props: {
      samples,
    },
  };
};
