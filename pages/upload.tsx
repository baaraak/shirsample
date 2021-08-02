import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { GiMicrophone } from "react-icons/gi";
import Button from "../components/Button";
import Dropzone from "../components/Dropzone";
import Recorder from "../components/Recorder";
import Select from "../components/Select";
import useUser from "../hooks/useUser";
import $fetch from "../lib/fetch";
import { LANGUAGES } from "../lib/languages";
import { MUSIC_GENRES } from "../lib/music-genres";

const TYPES = [];
const selectedClasses = "text-red-500 cursor-auto bg-white shadow";

const Upload: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [recordSampleMode, setRecordSampleMode] = useState(false);
  const [audioFile, setAudioFile] = useState();
  const [errors, setErrors] = useState();

  const submitData = async (data) => {
    console.log("in");
    if (!audioFile) return setErrors("Please add audio sample.");
    console.log("in2");
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const size = audioFile.size < 5242880;
      const type = audioFile.type.includes("audio/");

      // if (!type) return setErrors("Only audio file supported");
      if (!size) return setErrors("File must be less than 5mb");
    };
    fileReader.readAsText(audioFile);

    const formData = new FormData();
    console.log("after2");

    formData.append("file", audioFile);
    formData.append("Content-Type", audioFile.type);
    console.log("in3");

    const upload = await fetch("/api/sample/file", {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }

    console.log({ upload });

    // try {
    //   await $fetch("/api/sample", "POST", formData);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl mt-14 font-bold">
        Add a sample and let the community name it for you
      </h2>
      <form onSubmit={handleSubmit(submitData)} className="flex flex-col mt-6">
        <div className="flex mb-4">
          <Select {...register("genre")} className="block w-full">
            <option value="All">Genre</option>
            {MUSIC_GENRES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
          <Select
            {...register("language")}
            defaultValue="1"
            className="ml-4 block w-full"
          >
            <option value="1">Language</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.native}
              </option>
            ))}
          </Select>
        </div>
        <input
          type="text"
          className="rounded-full border-gray-300 border pl-6 py-3 mb-4"
          placeholder="Title"
          {...register("title")}
        />

        <textarea
          placeholder="Content"
          className="rounded-3xl border-gray-300 border pl-6 py-3 mb-2"
          rows={4}
          {...register("description")}
        />

        <div className="bg-red-100 rounded-lg flex p-1 my-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setRecordSampleMode(false);
            }}
            className={`flex flex-1 rounded-lg items-center py-2 font-bold justify-center ${
              !recordSampleMode
                ? selectedClasses
                : "text-gray-700 hover:text-red-500"
            }`}
          >
            <AiOutlineCloudUpload className="mr-2 text-lg" /> Upload
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setRecordSampleMode(true);
            }}
            className={`flex flex-1 rounded-lg items-center font-bold py-2 justify-center ml-1 ${
              recordSampleMode
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
              onClick={() => {
                setErrors();
                setAudioFile(null);
              }}
            >
              <AiOutlineDelete className="text-xl mr-2" />
              DELETE AUDIO
            </Button>
            <audio
              controls
              className="w-full"
              src={URL.createObjectURL(audioFile)}
            ></audio>
          </>
        ) : recordSampleMode ? (
          <Recorder onChange={setAudioFile} />
        ) : (
          <Dropzone onChange={(files) => setAudioFile(files[0])} />
        )}
        {errors && (
          <div className="p-2 bg-red-100 items-center text-red-800 leading-none lg:rounded-full flex lg:inline-flex mt-3 ">
            <span className="flex rounded-full text-white bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              Error
            </span>
            <span className="mr-2 text-left flex-auto">{errors}</span>
          </div>
        )}
        <Button
          type="submit"
          className="justify-center mt-4 font-bold"
          filled
          disabled={!!!audioFile}
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default Upload;
