import React, { ReactElement } from "react";

interface Props {}

export default React.forwardRef(function Select(
  { className, children, ...props },
  ref
): ReactElement {
  return (
    <select
      ref={ref}
      {...props}
      className={`${className} border border-gray-300 rounded-full pr-14 pl-5 py-3 `}
    >
      {children}
    </select>
  );
});
