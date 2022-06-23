import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from 'react-router-dom';
import validator from "validator";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import LabelInput from "../label-input/label-input";
import {
  setCurrentUserName,
  setAdmin,
  setUserId,
  setAuthError,
  signinUserStart,
  setToken
} from "../../redux/user/user-actions";

import './sign-in.css';

const SigninComponent = (props) => {
  const { setUserId, setAdmin, setCurrentUserName, history, autherrors, signinUserStart } = props;

  // const history = useHistory();
  const [emails, setEmail] = useState(""); //l
  const [passwords, setPassword] = useState(""); //l
  const [errors, setError] = useState(""); //l
  const [validSignin, setValidSignin] = useState(false); //l
  const [validSigninPassword, setValidSigninPassword] = useState(false); //l
  const [signUpError, setSignUpError] = useState(""); //s
  // console.log(autherrors)

  let arr = {};

  const login = async () => {
    arr.userEmail = emails
    arr.userPassword = passwords
    console.log('login');
    console.log(arr);
    
    signinUserStart(arr);
    // history.push('/home');
    // axios
    //   .post("http://localhost:5050/sign", {
    //     data: {
    //       email: emails,
    //       password: passwords,
    //     },
    //   })
    //   .then(async (result) => {
    //     console.log(result.data);
    //     if (result.data.error) {
    //       console.log(result.data.error);
    //       // setValidSignin(true);
    //       setError(result.data.error);
    //     } else {
    //       localStorage.setItem("token", result.data.token);
    //       localStorage.setItem("userName", result.data.userName);
    //       setUserId(result.data.id);
    //       if (result.data.admin === true) {
    //         setAdmin(true);
    //       } else {
    //         setAdmin(false);
    //       }

    //       setCurrentUserName(result.data.userName);
    //       history.push("/home");
    //       // {<Redirect to="/" />}
    //     }
    //     // console.log(result.data.cart.items); //never do this or it will break in first login
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       setError(err.response.data.message);
    //     } else {
    //       setError(err.message);
    //     }
    //   });
  };

  //setError ne redux state ma java dai and sign-in and sign-up ni error ek kari nakhi
  // console.log("in the signin jsx");
  const emailchange = (e) => {
    // setEmail()
    // console.log(e.target.value)
    if (!validator.isEmail(emails) || emails === null) {
      setValidSignin(true);
    } else {
      setValidSignin(false);
    }
    setError("");
    setSignUpError("");
    setEmail(e.target.value);
  };

  const passChange = (e) => {
    if (!validator.isStrongPassword(passwords, { minLength: 6 })) {
      setValidSigninPassword(true);
    } else {
      setValidSigninPassword(false);
    }
    setError("");
    setSignUpError("");
    setPassword(e.target.value);
  };

  const logSubmit = () => {
    login();
    console.log("hii there");
    // if(!validSignin && !validSigninPassword){
    // }else{
    //   setError("please login with proper credientials");
    // }
  };

  return (
    <div>
      <h1 className="SignInPagetitleText">Login In</h1>

      <label htmlFor="Email">E-mail</label>

      <LabelInput
        InputName="E-mail"
        labelFor="Email"
        onchange={emailchange}
        value={emails}
        type="email"
        valid={validSignin}
      />

      <p className="text-muted">
        We'll never share your email with anyone else.
      </p>

      <label htmlFor="Password">Password</label>

      <LabelInput
        InputName="Password"
        labelFor="Password"
        onchange={passChange}
        value={passwords}
        type="password"
        valid={validSigninPassword}
      />

      <input
        type="button"
        value="Login"
        onClick={logSubmit}
        className="btn btn-primary"
      />
      <br />
      <br />
      {/* {console.log(autherrors)} */}
      {/* <p className="text-danger">{errors}</p>
      <p className="text-danger">{autherrors}</p> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  autherrors: setAuthError(state),
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserName: (userName) => dispatch(setCurrentUserName(userName)),
  setUserId: (id) => dispatch(setUserId(id)),
  setAdmin: (admin) => dispatch(setAdmin(admin)),
  signinUserStart: (data) => dispatch(signinUserStart(data)),
  setToken: (token) => dispatch(setToken(token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SigninComponent));
