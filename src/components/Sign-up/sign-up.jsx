import React, { useState } from "react";
import axios from "axios";
import validator from 'validator';
import LabelInput from "../label-input/label-input";

import './sign-up.css';

const SignupComponent = () => {
  const [signupEmail, setSignupEmail] = useState(""); //s
  const [signupPassword, setSignupPassword] = useState(""); //s
  const [userName, setUserName] = useState(""); //s
  const [signUpError, setSignUpError] = useState(""); //s
  const [validSignup, setValidSignup] = useState(false); //s
  const [validSignupPassword, setValidSignupPassword] = useState(false); //s
  const [errors, setError] = useState(""); //l


  const signup = () => {
    axios
      .post("http://localhost:5050/signup", {
        data: {
          userName: userName,
          email: signupEmail,
          password: signupPassword,
        },
      })
      .then(() => {
        // console.log(result);
        // console.log(result.data);
        // props.CartEmpty();
        setSignupEmail("");
        setSignupPassword("");
        setUserName("");
        alert(
          "User has been Created please Now, Please signin with the appropriate Credentials"
        );
      })
      .catch((err) => {
        if (err.response) {
          setSignUpError(err.response.data.message);
        } else {
          setSignUpError(err.message);
        }
      });
  };

  const signupUserNameChange = (e) => {
    setError("");
    setSignUpError("");
    setUserName(e.target.value);
  };

  const signupEmailChange = (e) => {
    if (!validator.isEmail(signupEmail)) {
      console.log("hii");
      setValidSignup(true);
    } else {
      setValidSignup(false);
    }
    setError("");
    setSignUpError("");
    setSignupEmail(e.target.value);
  };

  const signupPasswordChange = (e) => {
    if (!validator.isStrongPassword(signupPassword, { minLength: 6 })) {
      setValidSignupPassword(true);
    } else {
      setValidSignupPassword(false);
    }
    setError("");
    setSignUpError("");
    setSignupPassword(e.target.value);
  };

  const SignupSubmit = () => {
    if (!validSignup && !validSignupPassword) signup();
  };
  return (
    <div>
      <h1 className="SignUpPagetitleText">Sign Up / Register</h1>

      <label htmlFor="UserName">UserName</label>

      <LabelInput
        InputName="UserName"
        labelFor="UserName"
        onchange={signupUserNameChange}
        value={userName}
        type="text"
      />

      <label htmlFor="Email">E-mail</label>

      <LabelInput
        InputName="eg. xyz_01@gmail.com"
        labelFor="Email"
        onchange={signupEmailChange}
        value={signupEmail}
        type="email"
        valid={validSignup}
      />

      <p className="text-muted">
        We'll never share your email with anyone else.
      </p>

      <label htmlFor="Password">Password</label>

      <LabelInput
        InputName="eg. Abcd@123"
        labelFor="Password"
        onchange={signupPasswordChange}
        value={signupPassword}
        type="password"
        valid={validSignupPassword}
      />
      {validSignupPassword ? (
        <p className="text-danger w-75">
          Password must be 7 character long and should contain atleast one
          unique character one upercase character and one number
        </p>
      ) : (
        ""
      )}

      <input
        className="btn btn-primary"
        type="button"
        value="Sign-up"
        onClick={SignupSubmit}
      />
      <br />
      {/* {result} */}
      <br />
      <p className="text-danger">{signUpError}</p>
    </div>
  );
};

export default SignupComponent;
