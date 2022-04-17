import React from 'react';

type Props = {
  onChange: (e: FileList) => void;
};

const Dropzone = ({ onChange }: Props) => {
  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const files = e.dataTransfer.files;
    if (files.length) {
      onChange(files);
    }
  };

  const filesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e.target.files);
    }
  };

  return (
    <div className="mb-4">
      <div
        className="h-36 border-2 border-dashed border-secondary rounded-3xl cursor-pointer relative text-secondary opacity-40 hover:opacity-100 transition"
        onDrop={fileDrop}
      >
        <div className="flex items-center justify-center text-xl h-full transition">
          Drag & Drop files here or click to select file
        </div>
        <input
          type="file"
          onChange={filesSelected}
          className="absolute inset-0 opacity-0 w-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Dropzone;
