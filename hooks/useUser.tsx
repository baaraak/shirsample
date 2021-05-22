import { useSession } from "next-auth/client";

export default function useUser() {
  const [session, loading] = useSession();

  return session?.user;
}