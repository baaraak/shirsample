import { GetServerSideProps } from "next";
import Link from "next/link";
import { dateStripped } from "../lib/utils";

import Head from "next/head";
import React from "react";
import prisma from "../lib/prisma";

const Index = ({ samples }: any) => {
  return (
    <>
      <Head>
        <title>Next.js Blog Example with</title>
      </Head>
      <ul>
        {samples.map((s) => (
          <li key={s.id}>
            <Link href={`/${s.id}`}>{s.title}</Link>
            <Link href={`/profile/${s.user.id}`}>
              <small>
                <b>created by: {s.user.name}</b>
              </small>
            </Link>
          </li>
        ))}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad distinctio
        libero inventore tenetur vero ab ut eligendi dicta, laudantium rerum
        sapiente possimus voluptates harum. Animi tempora sequi sed qui ex.Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ad distinctio libero
        inventore tenetur vero ab ut eligendi dicta, laudantium rerum sapiente
        possimus voluptates harum. Animi tempora sequi sed qui ex.
      </ul>
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
