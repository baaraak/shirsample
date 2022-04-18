import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  AiFillQuestionCircle,
  AiOutlineLike,
  AiOutlinePlayCircle,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { BsMusicNoteList } from 'react-icons/bs';
import $fetch from '../../lib/fetch';
import { getSample, getComments } from '../../lib/queries';
import { serializeResponse } from '../../lib/utils';
import { Sample } from '../../types/sample';

const Sample = ({ sample }: { sample: Sample }) => {
  const [body, setBody] = useState('');
  const [artistName, setArtistName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  console.log('in sample id:', { sample });

  const onSubmitComment = async (e) => {
    e.preventDefault();
    await $fetch('/api/comment', 'POST', { body, sampleId: sample.id });
  };

  const onSubmitProposal = async (e) => {
    e.preventDefault();
    await $fetch('/api/proposal', 'POST', {
      artist_name: artistName,
      song_title: songTitle,
      sampleId: sample.id,
    });
  };

  return (
    <div>
      <h2 className="text-2xl mt-12 mb-8 font-bold">Can you name this song?</h2>
      <div
        className="flex rounded-3xl mb-10 p-4 relative"
        // TODO: move color to tailwind theme
        style={{ background: '#F6F7FB' }}
      >
        <div className="h-24 w-24 bg-gray-200 mr-6 rounded-lg">
          <img src={sample.user.image} alt="" />
        </div>
        <div className="flex flex-1 flex-wrap">
          <div className="flex-1">
            <h4 className="text-2xl">
              <Link href={`/${sample.id}`}>{sample.title}</Link>
            </h4>
            <div>
              <span className="text-sm mr-1 text-gray-400 font-light">By:</span>
              <span className="text-red-500">
                <Link href={`/profile/${sample.user.id}`}>
                  {sample.user.name}
                </Link>
              </span>
            </div>
          </div>
          <div className="flex font-light ml-auto items-center text-red-500">
            <AiOutlineShareAlt className="mr-1" />
            Share
          </div>
          <div className="w-full mt-4 text-lg font-light text-gray-700">
            {sample.description}
          </div>
        </div>
        <div className="absolute right-0 bottom-0 flex -mb-5">
          <button className="btn py-3 px-9 items-center rounded-full mr-4 text-lg  tracking-widest">
            <AiOutlinePlayCircle className="mr-2 text-2xl" />
            LISTEN
          </button>
          <button className="btn py-3 px-8 items-center rounded-full mr-4 text-lg  tracking-widest">
            <AiFillQuestionCircle className="text-2xl mr-2" />
            ANSWERS
          </button>
        </div>
      </div>
      <h2 className="text-2xl mt-16 font-bold">Proposals</h2>
      {sample.proposals.map((c) => (
        <div key={c.id} className="py-8 border-b-2 flex">
          <div className="w-16 h-16 rounded-lg bg-gray-100">
            <img src={c.image} alt="" />
          </div>
          <div className="flex flex-1 px-6 flex-col">
            <div className="flex items-center">
              <div className="text-red-500 flex items-center text-xl mr-4">
                <BsMusicNoteList className="mr-2" /> <div>{c.artist_name}</div>
              </div>
              <div className="text-gray-400 font-light text-sm mr-1">
                3 days ago by
              </div>
              <div className="text-red-500">
                <Link href={`/profile/${c.user?.id}`}>
                  {c.user?.name || 'username'}
                </Link>
              </div>
            </div>
            <div className="text-lg font-light text-gray-700">
              "{c.song_title}"
            </div>
          </div>
          <div className="flex items-center">
            <button className="mr-4">
              <AiOutlinePlayCircle className="mr-2" />
              PLAY
            </button>
            <button>
              <AiOutlineLike className="mr-2" />
              (2) LIKE
            </button>
          </div>
        </div>
      ))}
      <h2 className="text-2xl mt-14 font-bold">Name the song</h2>
      <div className="flex my-6 border-b-2 pb-16">
        <div className="w-20 h-20 rounded-lg bg-gray-100 mr-6">
          <img src="" alt="" />
        </div>
        <form
          onSubmit={onSubmitProposal}
          className="flex justify-between items-center flex-1"
        >
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Artist Name"
              className="rounded-full border-gray-400 border pl-6 py-2 w-80 mb-2"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Song Title"
              className="rounded-full border-gray-400 border pl-6 py-2 w-80"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
            />
          </div>
          <button
            filled
            type="submit"
            className="px-12 py-4 text-xl tracking-widest"
          >
            SUBMIT
          </button>
        </form>
      </div>
      <h2 className="text-2xl mt-16 font-bold mb-6">Comments</h2>

      {sample.comments.map((c) => (
        <div key={c.id} className="mb-5 flex border-b pb-5">
          <div className="w-14 h-14 rounded-lg bg-gray-100 mr-6">
            <img src="" alt="" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="text-red-500 ">{c.user?.name || 'username'}</div>
              <div className="text-gray-400 italic text-sm">2 days ago</div>
            </div>
            <div className="text-lg text-gray-600">{c.body}</div>
          </div>
        </div>
      ))}

      <h2 className="text-xl py-4 font-bold">Add comment</h2>
      <form className="flex flex-wrap" onSubmit={onSubmitComment}>
        <div className="w-14 h-14 rounded-lg bg-gray-100 mr-6">
          <img src="" alt="" />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="rounded-3xl border-gray-400 border pl-6 py-2 w-80 mb-2 flex-1"
          placeholder="Write here..."
        />
        <div className="w-full">
          <button type="submit" className="px-6 py-3 tracking-widest ml-auto">
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sample;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const sample = await getSample(params?.sid);

  if (!sample)
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    };
  return {
    props: {
      sample: serializeResponse(sample),
    },
  };
};
