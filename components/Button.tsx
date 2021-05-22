import React, { useCallback } from "react";

export default function Button({
  className,
  children,
  filled = false,
  ...props
}) {
  const getClassNames = useCallback(() => {
    let classNames =
      "flex items-center border px-4 py-2 rounded-full  hover:shadow-xl transition duration-300";
    if (filled) {
      classNames +=
        "border-none text-white bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-500";
    } else {
      classNames +=
        "border border-red-500 text-red-500 bg-white hover:text-white hover:bg-red-500";
    }
    return classNames;
  }, []);
  return (
    <button className={`${className} ${getClassNames()}`} {...props}>
      {children}
    </button>
  );
}
