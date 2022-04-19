import React from 'react';
import { GetServerSideProps } from 'next';
import { getUser } from 'lib/queries';
import { serializeResponse } from 'lib/utils';

export default function UserProfile({ user }) {
  return <div>{user.name}</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = Number(params.id[0]);

  if (!Number.isInteger(id))
    return {
      redirect: {
        destination: '/',
      },
    };
  const user = await getUser(id);

  return {
    props: {
      user: serializeResponse(user),
    },
  };
};
