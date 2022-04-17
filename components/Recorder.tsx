import React, { useEffect } from 'react';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import useRecorder from '../hooks/useRecorder';

function Recorder({
  onChange,
}: {
  onChange: React.Dispatch<React.SetStateAction<Blob | undefined>>;
}) {
  let {
    audioValue,
    isRecording,
    startRecording,
    stopRecording,
    isMicrophoneAvailable,
  } = useRecorder();

  useEffect(() => {
    if (audioValue) {
      onChange(audioValue);
    }
  }, [audioValue]);

  if (!isMicrophoneAvailable)
    return (
      <div className="alert alert-error shadow-lg mb-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-bold">Error!</span>
          <span> Please enable your microphone permissions</span>
        </div>
      </div>
    );
  return (
    <div className="grid grid-cols-2 gap-5 mb-4">
      <button
        className="btn w-full btn-lg btn-secondary"
        onClick={startRecording}
        disabled={isRecording}
      >
        <AiOutlinePlayCircle className="mr-2 text-2xl" />
        Start Recording
      </button>
      <button
        className="btn w-full btn-lg"
        onClick={stopRecording}
        disabled={!isRecording}
      >
        <AiOutlinePauseCircle className="mr-2 text-2xl" />
        Stop Recording
      </button>
    </div>
  );
}

export default Recorder;
