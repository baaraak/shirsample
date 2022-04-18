import { GetServerSideProps } from 'next';
import { serializeResponse } from '../lib/utils';

import Head from 'next/head';
import React from 'react';
import prisma from '../lib/prisma';

import { MUSIC_GENRES } from '../lib/music-genres';
import { Sample } from '../types/sample';
import SampleCard from '../components/SampleCard';

const Index = ({ samples }: any) => {
  return (
    <>
      <Head>
        <title>Next.js Blog Example with</title>
      </Head>
      <div>
        <div className="flex mt-12 mb-8 items-center">
          <h2 className="text-3xl font-semibold">Try naming these samples</h2>
          <div className="ml-auto">
            <select defaultValue="1" className="select select-bordered mr-4">
              <option value="1">Last Samples</option>
              <option value="">No Listened</option>
              <option value="">Listened</option>
              <option value="">Without Proposals</option>
              <option value="">Random</option>
            </select>
            <select className="select select-bordered">
              <option value="All">All Genre</option>
              {MUSIC_GENRES.map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {samples.map((s: Sample) => (
            <SampleCard key={s.id} sample={s} />
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
      samples: serializeResponse(samples),
    },
  };
};
