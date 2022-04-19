import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import $fetch from 'lib/fetch';
import { serializeResponse } from 'lib/utils';
import { getUser } from 'lib/queries';

export default function Profile({ user }) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await $fetch('/api/user', 'PATCH', { name, bio });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  const user = await getUser(session.user.id);

  return {
    props: {
      user: serializeResponse(user),
    },
  };
};
