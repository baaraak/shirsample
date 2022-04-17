import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloudUpload, AiOutlineDelete } from 'react-icons/ai';
import { GiMicrophone } from 'react-icons/gi';
import Dropzone from '../components/Dropzone';
import Recorder from '../components/Recorder';
import $fetch from '../lib/fetch';
import { LANGUAGES } from '../lib/languages';
import { MUSIC_GENRES } from '../lib/music-genres';
import { CLOUDINARY_SAMPLES_FOLDER_NAME } from '../lib/constants';

type FormData = {
  audio?: string;
  title: string;
  description: string;
  language?: string;
  genre?: string;
};

async function getSignature() {
  const response = await $fetch('/api/cloudinary/sign-sample');
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

const Upload: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();
  const [recordSampleMode, setRecordSampleMode] = useState(false);
  const [audioFile, setAudioFile] = useState<File | Blob>();

  const onChangeAudio = (file: File | Blob) => {
    setAudioFile(file);
    clearErrors('audio');
  };

  const submitData = async (data: FormData) => {
    clearErrors('audio');

    if (!data.title)
      return setError('title', {
        message: 'Title is a required field',
      });
    if (!audioFile)
      return setError('audio', {
        type: 'custom',
        message: 'You must add an audio file',
      });

    // validate file size under 15mb
    if (audioFile.size > 15728640)
      return setError('audio', {
        type: 'custom',
        message: 'File must be less than 15mb',
      });

    // Get cloudinary security signature
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
      const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const cloudinaryResponse = await response.json();
      if (cloudinaryResponse.error) throw new Error(cloudinaryResponse.error);
      // POST to create sample
      const { secure_url, duration } = cloudinaryResponse;
      const { title, description, language, genre } = data;

      await $fetch('/api/sample', 'POST', {
        title,
        description,
        language: language === '-1' ? undefined : language,
        genre: genre === '-1' ? undefined : genre,
        url: secure_url,
        duration,
      });
    } catch (error) {
      console.log('in error');

      console.error(error);
    }
  };
  console.log(errors);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl mt-14 font-bold">
        Add a sample and let the community name it for you
      </h2>
      <form onSubmit={handleSubmit(submitData)} className="flex flex-col mt-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select {...register('genre')} className="select select-bordered">
            <option value="-1">Genre</option>
            {MUSIC_GENRES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select {...register('language')} className="select select-bordered">
            <option value="-1">Language</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.native}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className="input input-bordered mb-4"
          placeholder="Title"
          {...register('title')}
        />

        <textarea
          placeholder="Content"
          className="textarea textarea-bordered mb-4"
          rows={4}
          {...register('description')}
        />

        <div className="bg-pink-100 rounded-lg flex p-1 mb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setRecordSampleMode(false);
            }}
            className={`flex flex-1 rounded-lg items-center py-2 font-bold justify-center ${
              !recordSampleMode ? selectedClasses : 'hover:text-secondary'
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
              recordSampleMode ? selectedClasses : 'hover:text-secondary'
            }`}
          >
            <GiMicrophone className="mr-2 text-lg" /> Record
          </button>
        </div>

        {audioFile ? (
          <div className="mb-4">
            <button
              className="btn btn-error mb-2 btn-outline w-full"
              onClick={() => {
                clearErrors('audio');
                onChangeAudio(undefined);
              }}
            >
              <AiOutlineDelete className="text-xl mr-2" />
              DELETE AUDIO
            </button>
            <audio
              controls
              className="w-full"
              src={URL.createObjectURL(audioFile)}
            ></audio>
          </div>
        ) : recordSampleMode ? (
          <Recorder onChange={onChangeAudio} />
        ) : (
          <Dropzone onChange={(files) => onChangeAudio(files[0])} />
        )}
        {Object.keys(errors).length > 0 && (
          <div className="bg-bg-red-100 items-center text-red-500 leading-none lg:rounded-full flex lg:inline-flex mb-4">
            <ul className="mr-2 text-left flex-auto">
              {Object.values(errors).map((e, i) => (
                <li key={i}>{e.message}</li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

const selectedClasses = 'text-secondary cursor-auto bg-white shadow';

export default Upload;
