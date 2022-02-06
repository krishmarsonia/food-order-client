import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import validator from "validator";

import LabelInput from "../../components/label-input/label-input";
import NavbarComponent from "../../components/Navbar/navbar";
import { CartSet, CartEmpty } from "../../redux/cart/cart-actions";
import SigninupForm from "../../components/Signinup-Form/signinup-Form";
import {
  setCurrentUserName,
  setAdminTrue,
  setAdminFalse,
  setUserId,
} from "../../redux/user/user-actions";

import "./sigin-page.css";

const Signin = (props) => {
  // console.log(props)
  const history = useHistory();
  const [emails, setEmail] = useState("");
  const [passwords, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  // const [result, setResult] = useState("");
  const [errors, setError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [userName, setUserName] = useState("");
  const [validSignin, setValidSignin] = useState(false);
  const [validSignup, setValidSignup] = useState(false);
  const [validSigninPassword, setValidSigninPassword] = useState(false);
  const [validSignupPassword, setValidSignupPassword] = useState(false);
  //runs 2 times

  const login = async () => {
    axios
      .post("http://localhost:5050/sign", {
        data: {
          email: emails,
          password: passwords,
        },
      })
      .then(async (result) => {
        console.log(result.data);
        // console.log(result.data.cart.items); //never do this or it will break in first login

        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userName", result.data.userName);
        props.setUserId(result.data.id);
        if (result.data.admin === true) {
          props.setAdminTrue();
        } else {
          props.setAdminFalse();
        }
        // if(result.data.error.status){
        //   console.log('krish')
        //   throw new Error(result.data.message);
        // }
        // console.log(result.data);
        // setLoginResult(result.data.userName);
        // {result.data.cart ? props.CartSet(result.data.cart.items) : props.CartSet([])}
        props.setCurrentUserName(result.data.userName);
        history.push("/home");
        // {<Redirect to="/" />}
      })
      .catch((err) => {
        console.log(err.response.data.message);
        console.log(err.response.status);
        setError(err.response.data.message);
      });
  };
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
        console.log(err.response.data.message);
        console.log(err.response.status);
        setSignUpError(err.response.data.message);
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
    if(!(validSignup) && !(validSignupPassword))
    signup();
  };

  const emailchange = (e) => {
    // setEmail()
    // console.log(e.target.value)
    if (!validator.isEmail(emails)) {
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
    // if(!(validSignin) && !(validSigninPassword)){
    // }
    login();
  };

  const siginData = [
    {
      id: 1,
      name: "Email",
      onchag: emailchange,
      type: "email",
      val: emails,
      child: "Email",
    },
    {
      id: 2,
      name: "Password",
      onchag: passChange,
      type: "password",
      val: passwords,
      child: "Password",
    },
  ];
  const signupData = [
    {
      id: 1,
      name: "Username",
      onchag: signupUserNameChange,
      type: "text",
      val: userName,
      child: "UserName",
    },
    {
      id: 2,
      name: "Email",
      onchag: signupEmailChange,
      type: "email",
      val: signupEmail,
      child: "Email",
    },
    {
      id: 3,
      name: "Password",
      onchag: signupPasswordChange,
      type: "password",
      val: signupPassword,
      child: "Password",
    },
  ];

  return (
    <div className="container">
      <NavbarComponent />

      <Row>
        {/* <Col></Col> */}
        <Col xs="6">
          <h1 className="SignInPagetitleText">Login In</h1>

          {/* {siginData.map((sindata) => {
            return (
              <div key={sindata.id}>
                <SigninupForm
                  name={sindata.name}
                  onchag={sindata.onchag}
                  type={sindata.type}
                  val={sindata.val}
                  child={sindata.child}
                />
              </div>
            );
          })} */}

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
          <p className="text-danger">{errors}</p>
        </Col>

        <Col xs="6">
          <h1 className="SignUpPagetitleText">Sign Up / Register</h1>

          {/* {signupData.map((supdata) => {
            return (
              <div key={supdata.id}>
                <SigninupForm
                  name={supdata.name}
                  onchag={supdata.onchag}
                  type={supdata.type}
                  val={supdata.val}
                  child={supdata.child}
                />
              </div>
            );
          })} */}

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
        </Col>
        {/* <Col></Col> */}
      </Row>

      <br />
    </div>
  );
};

const mapDispacthToProps = (dispatch) => ({
  setCurrentUserName: (userName) => dispatch(setCurrentUserName(userName)),
  setAdminTrue: () => dispatch(setAdminTrue()),
  setAdminFalse: () => dispatch(setAdminFalse()),
  setUserId: (id) => dispatch(setUserId(id)),
  CartSet: (cart) => dispatch(CartSet(cart)),
  CartEmpty: () => dispatch(CartEmpty()),
});

export default connect(null, mapDispacthToProps)(Signin);
