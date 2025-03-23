import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
    />
  );
};

export default Input;
