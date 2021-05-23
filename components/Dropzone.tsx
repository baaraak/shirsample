import React, { useRef, useState, useEffect } from "react";

const Dropzone = ({ onChange }) => {
  const fileDrop = (e) => {
    const files = e.dataTransfer.files;
    if (files.length) {
      onChange(files);
    }
  };

  const filesSelected = (e) => {
    onChange(e.target.files);
  };

  return (
    <div className="my-4">
      <div
        className="h-36 border-2 border-dashed border-red-200 rounded-3xl cursor-pointer relative text-gray-500 hover:text-gray-700"
        onDrop={fileDrop}
      >
        <div className="flex items-center justify-center text-xl h-full transition">
          Drag & Drop files here or click to select file
        </div>
        <input
          accept="audio/*"
          type="file"
          onChange={filesSelected}
          className="absolute inset-0 opacity-0 w-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Dropzone;
