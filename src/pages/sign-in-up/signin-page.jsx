import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import NavbarComponent from "../../components/Navbar/navbar";
import SigninComponent from "../../components/Sign-in/sign-in";
import SignupComponent from "../../components/Sign-up/sign-up";

import "./sigin-page.css";

const Signin = () => {
  return (
    <div className="container">
      <NavbarComponent />

      <Row>
        <Col xs="6">
          <SigninComponent />
        </Col>

        <Col xs="6">
          <SignupComponent />
        </Col>
        {/* <Col></Col> */}
      </Row>

      <br />
    </div>
  );
};

export default Signin;
