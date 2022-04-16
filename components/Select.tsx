import React, { ReactElement } from 'react';

interface Props {
  className: string;
  children: React.HTMLElement | React.ReactElement;
}

export default React.forwardRef(function Select(
  { className, children, ...props }: Props,
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
