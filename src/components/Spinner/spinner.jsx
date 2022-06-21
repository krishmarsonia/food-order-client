import React from "react";
import { Spinner } from "react-bootstrap";

import './spinner.css'

const WithSpinner = ({isLoading}) => {
  // console.log(isLoading);
  if(!isLoading) {
    // console.log(isLoading);
      return null
  }
  return (
    <div className='spinner-position'>
      {/* {console.log(isLoading)} */}
      <center>
      <Spinner animation="border" />
      </center>
    </div>
  );
};

export default WithSpinner;
