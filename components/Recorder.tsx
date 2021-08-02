import React, { useEffect } from "react";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import useRecorder from "../hooks/useRecorder";
import Button from "./Button";

function Recorder({ onChange }) {
  let { audioValue, isRecording, startRecording, stopRecording } =
    useRecorder();

  useEffect(() => {
    if (audioValue) {
      onChange(audioValue);
    }
  }, [audioValue]);

  return (
    <div className="grid grid-cols-2 gap-5 mb-4">
      <Button
        className="w-full py-4 text-xl"
        onClick={startRecording}
        disabled={isRecording}
      >
        <AiOutlinePlayCircle className="mr-2 text-2xl" />
        Start Recording
      </Button>
      <Button
        className="w-full py-4 text-xl"
        onClick={stopRecording}
        disabled={!isRecording}
      >
        <AiOutlinePauseCircle className="mr-2 text-2xl" />
        Stop Recording
      </Button>
    </div>
  );
}

export default Recorder;
