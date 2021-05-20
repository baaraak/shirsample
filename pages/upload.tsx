import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import $fetch from "../lib/fetch";

const Upload: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [recordSample, setRecordSample] = useState(false);

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
  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <input placeholder="Title" {...register("title")} />
        <textarea
          cols={50}
          placeholder="Content"
          rows={8}
          {...register("description")}
        />

        {recordSample ? (
          <div>press to record</div>
        ) : (
          <input
            type="file"
            {...register("sample", { required: true })}
            accept="audio/mp3"
          />
        )}
        <input
          type="radio"
          id="record"
          name="gender"
          checked={recordSample}
          onClick={() => setRecordSample(!recordSample)}
        />
        <label htmlFor="record">Record</label>
        <input
          type="radio"
          id="upload"
          name="gender"
          value="upload"
          onClick={() => setRecordSample(!recordSample)}
          checked={!recordSample}
        />
        <label htmlFor="upload">Upload</label>

        <input type="submit" />
      </form>
    </>
  );
};

export default Upload;
