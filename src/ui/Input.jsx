import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Input = ({
  onFocusStyle,
  iconStr,
  placeholder,
  onChange,
  onKeyDown,
  inputValue,
  inputRef,
  size = "lg",
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div relative>
      <div
        className={`
        
    top-[50%] translate-y-[-50%] absolute translate-x-6 text-gray-400
    ${iconStr}
     ${onFocusStyle} ${size === "lg" ? "text-4xl" : "text-[2rem]"}`}
      ></div>
      <div
        className={`${
          focused ? "border-gray-500" : ""
        }  border rounded-15 border-gray-300
         ${
           size === "lg" ? "text-4xl p-6 bg-white" : "text-2xl p-3 bg-gray-100"
         }`}
      >
        <input
          className={`px-13 w-full bg-transparent focus:outline-none`}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Input;
