import React from 'react';
import {
  AiFillQuestionCircle,
  AiOutlinePlayCircle,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import Link from 'next/link';
import { Sample } from '../types/sample';

export default function SampleCard({ sample }: { sample: Sample }) {
  return (
    <div
      className="flex rounded-3xl mb-10 p-4 relative border border-base-content"
      // TODO: move color to tailwind theme
    >
      <div className="h-24 w-24 bg-gray-200 mr-6 rounded-lg">
        <img src={sample.user.image} alt="" />
      </div>
      <div className="flex flex-1 flex-wrap">
        <div className="flex-1">
          <h4 className="text-2xl text-primary-content">
            <Link href={`/sample/${sample.id}`}>{sample.title}</Link>
          </h4>
          <div className="text-sm">
            <span className="mr-1 font-light">By:</span>
            <span className="link">
              <Link href={`/profile/${sample.user.id}`}>
                {sample.user.name}
              </Link>
            </span>
          </div>
        </div>
        <div className="flex font-light ml-auto items-center ">
          <AiOutlineShareAlt className="mr-1" />
          Share
        </div>
        <div className="w-full text-lg font-light text-gray-700">
          {sample.description || (
            <span className="italic">No description added</span>
          )}
        </div>
      </div>
      <div className="absolute right-0 bottom-0 flex -mb-5">
        <button className="btn mr-4 btn-lg rounded-full px-12 btn-secondary">
          <AiOutlinePlayCircle className="mr-2 text-2xl" />
          LISTEN
        </button>
        <button className="btn mr-8 btn-lg rounded-full px-12 btn-primary">
          <AiFillQuestionCircle className="text-2xl mr-2" />
          ANSWERS
        </button>
      </div>
    </div>
  );
}
