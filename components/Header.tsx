import React from "react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { FiSearch, FiMic } from "react-icons/fi";
import Logo from "../components/Logo";
import { signOut, useSession } from "next-auth/client";
import useUser from "../hooks/useUser";
import Button from "./Button";

export default function Header() {
  const user = useUser();

  return (
    <div className="py-3 px-4 flex shadow-header bg-white z-10 relative">
      <div className="flex max-w-screen-lg w-full m-auto justify-between items-center">
        <Logo />
        <nav className="flex items-center">
          <Link href="/">
            <a className="text-lg font-light mx-8 text-gray-500 hover:text-red-500 transition">
              Home
            </a>
          </Link>
          <Link href="/messages">
            <a className="text-lg font-light mx-8 text-gray-500 hover:text-red-500 transition">
              Messages
            </a>
          </Link>
          <Link href="/profile">
            <a className="text-lg font-light mx-8 text-gray-500 hover:text-red-500 transition">
              Profile
            </a>
          </Link>
        </nav>
        <div className="flex items-center">
          <Button className="flex px-8 py-3 rounded-full">
            <FiMic className="text-2xl mr-4" />
            Post Sample
          </Button>

          <div className="mx-7">
            <button className="text-2xl text-red-500 cursor-pointer transition transform hover:scale-105">
              <FiSearch />
            </button>
          </div>
          {user ? (
            <button className="text-3xl text-red-500 border border-red-500 rounded-full p-1 cursor-pointer  hover:scale-105 transform transition">
              <AiOutlineUser />
            </button>
          ) : (
            <>
              <AiOutlineUser />
              <Link href="/api/auth/signin">login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
