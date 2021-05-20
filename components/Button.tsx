import React from "react";

const classNames =
  "flex border px-4 py-2 rounded-2xl border-red-500 text-red-500 hover:shadow-xl transition duration-300";

export default function Button({ className, children, ...props }) {
  return (
    <button className={`${classNames} ${className}`} {...props}>
      {children}
    </button>
  );
}
