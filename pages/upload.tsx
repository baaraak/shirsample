import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { GiMicrophone } from "react-icons/gi";
import Button from "../components/Button";
import Dropzone from "../components/Dropzone";
import Recorder from "../components/Recorder";
import useUser from "../hooks/useUser";
import $fetch from "../lib/fetch";

const TYPES = [];
const selectedClasses = "text-red-500 cursor-auto bg-white shadow";

const Upload: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [recordSample, setRecordSample] = useState(false);
  const [audioFile, setAudioFile] = useState();

  const handleAudioChange = (files) => {
    console.log("in", files);

    const f = files[0];
    var file = URL.createObjectURL(f);

    setAudioFile(file);
  };

  const handleAudioRecord = (audioURL) => {
    setAudioFile(audioURL);
  };

  const submitData = async (data) => {
    console.log(data);

    const f = data.sample[0];
    var r = new FileReader();
    r.onload = function (e) {
      var contents = e.target.result;
      const size = f.size > 5242880;
      const type = TYPES.includes(f.type);
    };
    r.readAsText(f);
    return;

    try {
      await $fetch("/api/sample", "POST", data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("audioFile", audioFile);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl mt-14 font-bold">
        Add a sample and let the community name it for you
      </h2>
      <form onSubmit={handleSubmit(submitData)} className="flex flex-col mt-6">
        <input
          type="text"
          className="rounded-full border-gray-300 border pl-6 py-3 mb-4"
          placeholder="Title"
          {...register("title")}
        />

        <div className="flex mb-4">
          <select
            name=""
            id=""
            defaultValue="1"
            className="border border-gray-300 rounded-full pr-14 pl-5 py-3 block w-full"
          >
            <option value="1">All Genres</option>
            <option value="">Rock</option>
            <option value="">Pop</option>
            <option value="">Electro</option>
            <option value="">Jaz</option>
            <option value="">Country</option>
            <option value="">Other</option>
          </select>
          <select
            name=""
            id=""
            defaultValue="1"
            className="border border-gray-300 rounded-full pr-14 pl-5 py-3 mr-4 block w-full"
          >
            <option value="1">Language</option>
            <option value="">No Listened</option>
            <option value="">Listened</option>
            <option value="">Without Proposals</option>
            <option value="">Random</option>
          </select>
        </div>
        <textarea
          placeholder="Content"
          className="rounded-3xl border-gray-300 border pl-6 py-3 mb-2"
          rows={4}
          {...register("description")}
        />

        <div className="bg-red-100 rounded-lg flex p-1 my-6">
          <button
            onClick={() => setRecordSample(false)}
            className={`flex flex-1 transition rounded-lg items-center py-2 font-bold justify-center ${
              !recordSample
                ? selectedClasses
                : "text-gray-700 hover:text-red-500"
            }`}
          >
            <AiOutlineCloudUpload className="mr-2 text-lg" /> Upload
          </button>
          <button
            onClick={() => setRecordSample(true)}
            className={`flex flex-1 transition rounded-lg items-center font-bold py-2 justify-center ml-1 ${
              recordSample
                ? selectedClasses
                : "text-gray-700 hover:text-red-500"
            }`}
          >
            <GiMicrophone className="mr-2 text-lg" /> Record
          </button>
        </div>

        {audioFile ? (
          <>
            <Button
              className="mb-2 font-bold"
              onClick={() => setAudioFile(null)}
            >
              <AiOutlineDelete className="text-xl mr-2" />
              DELETE AUDIO
            </Button>
            <audio controls className="w-full" src={audioFile}></audio>
          </>
        ) : recordSample ? (
          <Recorder onChange={handleAudioRecord} />
        ) : (
          <Dropzone onChange={handleAudioChange} />
        )}
        {errors.sample && <div>please add sample audio</div>}

        <Button className="justify-center mt-4 font-bold" filled>
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default Upload;
