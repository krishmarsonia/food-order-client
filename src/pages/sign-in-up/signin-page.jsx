import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

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
      .then((result) => {
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
    setError("");
    setSignUpError("");
    setSignupEmail(e.target.value);
  };

  const signupPasswordChange = (e) => {
    setError("");
    setSignUpError("");
    setSignupPassword(e.target.value);
  };

  const SignupSubmit = () => {
    signup();
  };

  const emailchange = (e) => {
    // setEmail()
    // console.log(e.target.value)
    setError("");
    setSignUpError("");
    setEmail(e.target.value);
  };
  const passChange = (e) => {
    setError("");
    setSignUpError("");
    setPassword(e.target.value);
  };
  const logSubmit = () => {
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

          {siginData.map((sindata) => {
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
          })}
          <input
            type="button"
            value="Submit"
            onClick={logSubmit}
            className="btn btn-primary"
          />
          <br /><br />
          <p className="text-danger">{errors}</p>
        </Col>
       
        <Col xs="6">
          <h1 className="SignUpPagetitleText">Sign Up / Register</h1>

          {signupData.map((supdata) => {
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
          })}
          
          <input
            className="btn btn-primary"
            type="button"
            value="submit"
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
