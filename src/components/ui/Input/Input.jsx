import React from "react";

export const Input = ({
  className,
  onChange,
  value,
  type,
  placeholder,
  onKeyDown
}) => {
  return (
    <>
      <input
        className={className}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};
