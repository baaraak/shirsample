import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import Button from './Button';
import useBanner from '../hooks/useBanner';

export default function Banner() {
  const { isVisible, handleClose } = useBanner();

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-between flex-wrap slideDownIn">
      <div>
        <h3 className="text-4xl font-bold">
          <p className="block text-red-500">We are a</p>
          Naming Community.
        </h3>
        <div className="mt-6 text-xl text-gray-400 font-light">
          A tune is stuck in your head?
        </div>
        <div className="text-xl text-gray-800 font-light">
          The community can name it for you.
        </div>

        <div className="mt-2 text-xl text-gray-400 font-light">
          You think you know the music?
        </div>
        <div className="text-xl text-gray-800 font-light">
          Try naming the other songs!
        </div>
      </div>
      <Image
        src="/banner.png"
        alt="singing woman"
        className="banner__image"
        width="500"
        height="300"
      />

      <div className="w-full flex justify-center">
        <Button
          onClick={handleClose}
          className="items-center px-8 py-4 rounded-full text-red-500 bg-red-100 border-none tracking-widest -mt-7 relative hover:shadow-xl hover:bg-red-500 hover:text-white"
        >
          <AiOutlineClose className="mr-3 text-lg" /> COLLAPSE
        </Button>
      </div>
    </div>
  );
}
