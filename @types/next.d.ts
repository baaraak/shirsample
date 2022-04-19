import { IncomingMessage } from 'http';
import { DefaultUser } from 'next-auth';

declare module 'next' {
  export interface NextApiRequest extends IncomingMessage {
    user?: DefaultUser;
  }
}
