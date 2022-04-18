import Link from 'next/link';
import { AiOutlineLike, AiOutlinePlayCircle } from 'react-icons/ai';
import { BsMusicNoteList } from 'react-icons/bs';
import { Proposal } from '../types/proposal';

export default function Proposals({ proposals }: { proposals: Proposal[] }) {
  return (
    <>
      <h2 className="text-2xl mt-16 font-bold">Proposals</h2>
      {proposals.map((c) => (
        <div key={c.id} className="py-8 border-b-2 flex">
          <div className="w-16 h-16 rounded-lg bg-gray-100">
            <img src={c.image} alt="" />
          </div>
          <div className="flex flex-1 px-6 flex-col">
            <div className="flex items-center">
              <div className="text-red-500 flex items-center text-xl mr-4">
                <BsMusicNoteList className="mr-2" /> <div>{c.artist_name}</div>
              </div>
              <div className="text-gray-400 font-light text-sm mr-1">
                3 days ago by
              </div>
              <div className="text-red-500">
                <Link href={`/profile/${c.user?.id}`}>
                  {c.user?.name || 'username'}
                </Link>
              </div>
            </div>
            <div className="text-lg font-light text-gray-700">
              "{c.song_title}"
            </div>
          </div>
          <div className="flex items-center">
            <button className="mr-4">
              <AiOutlinePlayCircle className="mr-2" />
              PLAY
            </button>
            <button>
              <AiOutlineLike className="mr-2" />
              (2) LIKE
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
