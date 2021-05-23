import { GetServerSideProps } from "next";
import Link from "next/link";
import { dateStripped } from "../lib/utils";

import Head from "next/head";
import React from "react";
import prisma from "../lib/prisma";
import {
  AiFillQuestionCircle,
  AiOutlinePlayCircle,
  AiOutlineShareAlt,
} from "react-icons/ai";
import Button from "../components/Button";

const Index = ({ samples }: any) => {
  return (
    <>
      <Head>
        <title>Next.js Blog Example with</title>
      </Head>
      <div>
        <div className="flex mt-12 mb-8 items-center">
          <h2 className="text-2xl font-bold">Try naming these samples</h2>
          <div className="ml-auto">
            <select
              name=""
              id=""
              defaultValue="1"
              className="border border-gray-300 rounded-full pr-14 pl-5 py-3 mr-4"
            >
              <option value="1">Last Samples</option>
              <option value="">No Listened</option>
              <option value="">Listened</option>
              <option value="">Without Proposals</option>
              <option value="">Random</option>
            </select>
            <select
              name=""
              id=""
              defaultValue="1"
              className="border border-gray-300 rounded-full pr-14 pl-5 py-3"
            >
              <option value="1">All Genres</option>
              <option value="">Rock</option>
              <option value="">Pop</option>
              <option value="">Electro</option>
              <option value="">Jaz</option>
              <option value="">Country</option>
              <option value="">Other</option>
            </select>
          </div>
        </div>
        <div>
          {samples.map((s) => (
            <div
              key={s.id}
              className="flex rounded-3xl mb-10 p-4 relative"
              // TODO: move color to tailwind theme
              style={{ background: "#F6F7FB" }}
            >
              <div className="h-24 w-24 bg-gray-200 mr-6 rounded-lg">
                <img src={s.user.image} alt="" />
              </div>
              <div className="flex flex-1 flex-wrap">
                <div className="flex-1">
                  <h4 className="text-2xl">
                    <Link href={`/${s.id}`}>{s.title}</Link>
                  </h4>
                  <div>
                    <span className="text-sm mr-1 text-gray-400 font-light">
                      By:
                    </span>
                    <span className="text-red-500">
                      <Link href={`/profile/${s.user.id}`}>{s.user.name}</Link>
                    </span>
                  </div>
                </div>
                <div className="flex font-light ml-auto items-center text-red-500">
                  <AiOutlineShareAlt className="mr-1" />
                  Share
                </div>
                <div className="w-full mt-4 text-lg font-light text-gray-700">
                  {s.description}
                </div>
              </div>
              <div className="absolute right-0 bottom-0 flex -mb-5">
                <Button
                  className="py-3 px-9 items-center rounded-full mr-4 text-lg  tracking-widest"
                  filled
                >
                  <AiOutlinePlayCircle className="mr-2 text-2xl" />
                  LISTEN
                </Button>
                <Button className="py-3 px-8 items-center rounded-full mr-4 text-lg  tracking-widest">
                  <AiFillQuestionCircle className="text-2xl mr-2" />
                  ANSWERS
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
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
