import React, { useCallback } from "react";

export default React.forwardRef(
  (
    { className, children, filled = false, disabled = false, ...props },
    ref
  ) => {
    const getClassNames = () => {
      let classNames =
        "flex items-center justify-center border px-4 py-2 rounded-full hover:shadow-xl transition duration-300 ";

      if (disabled) {
        return (classNames +=
          "border-gray-400 text-gray-400 cursor-default hover:shadow-none ");
      }
      if (filled) {
        classNames +=
          "text-white bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-500 ";
      } else {
        classNames +=
          "border-red-500 text-red-500 bg-white hover:text-white hover:bg-red-500 ";
      }
      return classNames;
    };
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${className} ${getClassNames()}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
