import React, { useState } from "react";
import useUser from "../hooks/useUser";
import $fetch from "../lib/fetch";

const Upload: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useUser();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await $fetch("/api/sample", "POST", { title, description: content });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={submitData}>
        <h1>New Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input disabled={!content || !title} type="submit" value="Create" />
      </form>
    </>
  );
};

export default Upload;
