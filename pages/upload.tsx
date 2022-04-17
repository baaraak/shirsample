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
  title: string;
  description: string;
  language: string;
  genre: string;
};

async function getSignature() {
  const response = await $fetch('/api/cloudinary/sign-sample');
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

const Upload: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [recordSampleMode, setRecordSampleMode] = useState(false);
  const [audioFile, setAudioFile] = useState<File | Blob>();
  const [errors, setErrors] = useState('');

  const submitData = async (data: FormData) => {
    if (!!data.title || !audioFile)
      return setErrors('You must add a title and select an audio file');

    // Read the audio file sample and upload it to cloudinary
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      // validate file size
      const size = audioFile.size < 5242880;
      if (!size) return setErrors('File must be less than 15mb');
    };
    fileReader.readAsText(audioFile);

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
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      // POST to create sample
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
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select {...register('genre')} className="select select-bordered">
            <option value="All">Genre</option>
            {MUSIC_GENRES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select {...register('language')} className="select select-bordered">
            <option value="1">Language</option>
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
          <>
            <button
              className="btn btn-error mb-2 btn-outline"
              onClick={() => {
                setErrors('');
                setAudioFile(undefined);
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
          </>
        ) : recordSampleMode ? (
          <Recorder onChange={setAudioFile} />
        ) : (
          <Dropzone onChange={(files) => setAudioFile(files[0])} />
        )}
        {errors && (
          <div className="bg-bg-red-100 items-center text-red-500 leading-none lg:rounded-full flex lg:inline-flex mb-4">
            <span className="mr-2 text-left flex-auto">{errors}</span>
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
