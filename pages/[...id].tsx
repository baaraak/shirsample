import { GetServerSideProps } from "next";
import React from "react";
import prisma from "../lib/prisma";
import { dateStripped } from "../lib/utils";

const Sample = ({ sample }) => {
  return (
    <>
      sample page
      {sample}
    </>
  );
};

export default Sample;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = Number(params.id[0]);

  if (!Number.isInteger(id))
    return {
      redirect: {
        destination: "/",
      },
    };
  const sample = await prisma.sample.findUnique({
    where: { id },
  });

  if (!sample)
    return {
      redirect: {
        destination: "/",
      },
    };
  return {
    props: {
      sample: dateStripped(sample),
    },
  };
};
