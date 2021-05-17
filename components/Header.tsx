import React from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import { signOut, useSession } from "next-auth/client";
import useUser from "../hooks/useUser";

export default function Header() {
  const user = useUser();

  return (
    <div>
      <Logo />
      <nav>
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/messages">messages</Link>
      </nav>
      {user ? (
        <div>
          Hello, {user.name} <br />
          <button onClick={signOut}>log out</button>
        </div>
      ) : (
        <Link href="/api/auth/signin">login</Link>
      )}
    </div>
  );
}
