import type { DefaultUser } from 'next-auth';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
