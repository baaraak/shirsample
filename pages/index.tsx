import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Sample } from '@types/sample';
import { serializeResponse } from 'lib/utils';
import prisma from 'lib/prisma';
import { MUSIC_GENRES } from 'lib/music-genres';
import SampleCard from 'components/SampleCard';

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
              {(MUSIC_GENRES as string[]).map((v) => (
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
  // cloudinary.config({
  //   cloud_name: 'djyerevgr',
  //   api_key: '858125511767918',
  //   api_secret: 'X1yKvgWCgru2Rk0cpsk8NKABoDU',
  //   secure: true,
  // });
  // cloudinary.search
  //   .expression('resource_type:video')

  //   .execute()
  //   .then((result) => console.log(result));
  const samples = await prisma.sample.findMany({
    include: { user: { select: { name: true, id: true } } },
  });
  return {
    props: {
      samples: serializeResponse(samples),
    },
  };
};
