import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import Proposals from '../../components/Proposals';
import SampleCard from '../../components/SampleCard';
import $fetch from '../../lib/fetch';
import { BsDisc, BsFillDiscFill } from 'react-icons/bs';
import { getSample, getComments } from '../../lib/queries';
import { serializeResponse } from '../../lib/utils';
import { Sample } from '../../@types/sample';
import { useForm } from 'react-hook-form';

type ProposalFormData = {
  artist_name: string;
  song_title: string;
};

const Sample = ({ sample }: { sample: Sample }) => {
  const [body, setBody] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalFormData>();

  const onSubmitComment = async (data) => {
    await $fetch('/api/comment', 'POST', { body, sampleId: sample.id });
  };

  const onSubmitProposal = async (data: ProposalFormData) => {
    console.log(data);
    await $fetch('/api/proposal', 'POST', {
      artist_name: data.artist_name,
      song_title: data.song_title,
      sampleId: sample.id,
    });
  };

  return (
    <div>
      <h2 className="text-2xl mt-12 mb-8 font-bold">Can you name this song?</h2>
      <SampleCard sample={sample} />
      {!!sample.proposals.length && <Proposals proposals={sample.proposals} />}
      <h2 className="text-2xl mt-14 font-bold">Name the song</h2>
      <div className="flex my-6 border-b border-base-content pb-16">
        <div className="w-20 h-20 rounded-lg mr-6 text-7xl flex items-center justify-center">
          <BsFillDiscFill />
        </div>
        <form
          onSubmit={handleSubmit(onSubmitProposal)}
          className="flex justify-between items-center flex-1"
        >
          <div className="flex flex-col w-80">
            <input
              required
              {...register('artist_name', { required: true })}
              type="text"
              placeholder="Artist Name"
              className="input input-bordered mb-2"
            />
            <input
              required
              {...register('song_title', { required: true })}
              type="text"
              placeholder="Song Title"
              className="input input-bordered"
            />
          </div>
          <button type="submit" className="btn btn-lg btn-info">
            Add Proposal
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
        <div className="w-14 h-14 rounded-lg bg-gray-100">
          <img src={sample.user.image} alt="" />
        </div>
        <textarea
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
          className="textarea textarea-bordered flex-1 mx-4"
          placeholder="Write here..."
        />

        <button type="submit" className="btn btn-info btn-lg ">
          Add Comment
        </button>
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
