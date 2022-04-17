import React from 'react';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import { FiMic } from 'react-icons/fi';
import Logo from '../components/Logo';
import useUser from '../hooks/useUser';

export default function Header() {
  const user = useUser();

  return (
    <div className="py-3 px-4 flex shadow-header accent-content bg-base-300    z-10 relative">
      <div className="flex max-w-screen-lg w-full m-auto justify-between items-center">
        <Logo />
        <nav className="flex items-center">
          <Link href="/">
            <a className="text-lg font-light mx-8 hover:text-secondary transition">
              Home
            </a>
          </Link>
          <Link href="/messages">
            <a className="text-lg font-light mx-8 hover:text-secondary transition">
              Messages
            </a>
          </Link>
          <Link href="/profile">
            <a className="text-lg font-light mx-8 hover:text-secondary transition">
              Profile
            </a>
          </Link>
        </nav>
        <div className="flex items-center">
          {user ? (
            <>
              <Link href="/upload">
                <button className="btn btn-primary">
                  <FiMic className="text-2xl mr-2" />
                  Post a Sample
                </button>
              </Link>
              <div className="avatar ml-8">
                <div className="w-10 rounded-full ring-1 ring-secondary ring-offset-base-100 ring-offset-2">
                  <img src="https://api.lorem.space/image/face?hash=3174" />
                </div>
              </div>
            </>
          ) : (
            <Link href="/api/auth/signin">Login | Signup</Link>
          )}
        </div>
      </div>
    </div>
  );
}
