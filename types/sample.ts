import { User } from 'next-auth';
import { Proposal } from './proposal';

export type Sample = {
  url: string;
  title: string;
  description: string;
  duration: string;
  language: string;
  genre: string;
  id: string;
  user: User;
  proposals: Proposal[];
};
