import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloudUpload, AiOutlineDelete } from 'react-icons/ai';
import { GiMicrophone } from 'react-icons/gi';
import Button from '../components/Button';
import Dropzone from '../components/Dropzone';
import Recorder from '../components/Recorder';
import Select from '../components/Select';
import useUser from '../hooks/useUser';
import $fetch from '../lib/fetch';
import { LANGUAGES } from '../lib/languages';
import { MUSIC_GENRES } from '../lib/music-genres';
import { CLOUDINARY_SAMPLES_FOLDER_NAME } from '../lib/constants';

const TYPES = [];
const selectedClasses = 'text-red-500 cursor-auto bg-white shadow';

async function getSignature() {
  const response = await $fetch('/api/cloudinary/sign-sample');
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

const Upload: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [recordSampleMode, setRecordSampleMode] = useState(false);
  const [audioFile, setAudioFile] = useState();
  const [errors, setErrors] = useState();

  const submitData = async (data) => {
    if (!audioFile) return setErrors('Please add audio sample.');

    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const size = audioFile.size < 5242880;
      const type = audioFile.type.includes('audio/');

      // if (!type) return setErrors("Only audio file supported");
      if (!size) return setErrors('File must be less than 5mb');
    };
    fileReader.readAsText(audioFile);
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`;

    const { signature, timestamp } = await getSignature();
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);
    formData.append('folder', CLOUDINARY_SAMPLES_FOLDER_NAME);
    formData.append('format', 'mp3');
    formData.append('api_key', process.env.CLOUDINARY_API_KEY);

    try {
      // POST to Cloudinary api to upload sample audio
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      // POST to server to create sample
      const { secure_url, duration } = data;

      await $fetch('/api/sample', 'POST', {
        url: secure_url,
        duration,
        ...data,
      });
    } catch (error) {
      console.log('in error');

      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl mt-14 font-bold">
        Add a sample and let the community name it for you
      </h2>
      <form onSubmit={handleSubmit(submitData)} className="flex flex-col mt-6">
        <div className="flex mb-4">
          <Select {...register('genre')} className="block w-full">
            <option value="All">Genre</option>
            {MUSIC_GENRES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
          <Select
            {...register('language')}
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
          {...register('title')}
        />

        <textarea
          placeholder="Content"
          className="rounded-3xl border-gray-300 border pl-6 py-3 mb-2"
          rows={4}
          {...register('description')}
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
                : 'text-gray-700 hover:text-red-500'
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
                : 'text-gray-700 hover:text-red-500'
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
