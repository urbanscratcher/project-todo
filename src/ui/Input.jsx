import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { forwardRef } from "react";

const Input = ({
  onFocusStyle,
  iconStr,
  placeholder,
  onChange,
  onKeyDown,
  inputValue,
  inputRef,
}) => {
  return (
    <div relative>
      <div
        absolute
        text-4xl
        translate-x-6
        text-gray-400
        className={`${iconStr}
    top-[50%] translate-y-[-50%]
     ${onFocusStyle}`}
      ></div>
      <div bg-gray-50 border rounded-15 border-gray-300 px-6 py-6 text-4xl>
        <input
          px-13
          w-full
          bg-transparent
          className="focus:outline-none"
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputValue}
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Input;
