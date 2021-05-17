import { useSession } from "next-auth/client";

export default function useUser() {
  const [session] = useSession();

  return session?.user;
}
