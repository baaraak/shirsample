import { User } from 'next-auth';

export type Proposal = {
  id: string;
  image: string;
  artist_name: string;
  song_title: string;
  user: User;
};
