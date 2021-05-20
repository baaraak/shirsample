import { GetServerSideProps } from "next";
import React, { useState } from "react";
import $fetch from "../lib/fetch";
import prisma from "../lib/prisma";
import { getSample, getComments } from "../lib/queries";
import { dateStripped } from "../lib/utils";

const Sample = ({ sample }) => {
  const [body, setBody] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songTitle, setSongTitle] = useState("");
  console.log({ sample });

  const onSubmitComment = async (e) => {
    e.preventDefault();
    await $fetch("/api/comment", "POST", { body, sampleId: sample.id });
  };

  const onSubmitProposal = async (e) => {
    e.preventDefault();
    await $fetch("/api/proposal", "POST", {
      artist_name: artistName,
      song_title: songTitle,
      sampleId: sample.id,
    });
  };

  return (
    <>
      <br />
      sample page
      <b>created by: {sample.user.name}</b>
      <br />
      <br />
      {sample.title}
      <br />
      <br />
      {sample.description}
      <h2>proposals</h2>
      {sample.proposals.map((c) => (
        <ul key={c.id} className="m-2">
          <li>{c.artist_name}</li>
          <li>{c.song_title}</li>
        </ul>
      ))}
      <form onSubmit={onSubmitProposal}>
        <input
          type="text"
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Song Title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <h2>comments</h2>
      {sample.comments.map((c) => (
        <div key={c.id}>{c.body}</div>
      ))}
      <form onSubmit={onSubmitComment}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
          placeholder="Write here..."
        />
        <button type="submit">add comment</button>
      </form>
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
  const sample = await getSample(id);

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
