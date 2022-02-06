import React from "react";

import LabelInput from "../label-input/label-input";

const SigninupForm = (sinupdata) => {
  const { name, onchag, type, val, child, } = sinupdata;
  const mutedtext = (name) => {
    if (name === "Email") {
      return (
        <p className="text-muted">
          We'll never share your email with anyone else.
        </p>
      );
    }
  };
  return (
    <div>
      <label htmlFor={name}>{child}</label>

      <LabelInput
        InputName={child}
        labelFor={name}
        onchange={onchag}
        value={val}
        type={type}
      />
      
    {mutedtext(name)}
    </div>
  );
};

export default SigninupForm;
