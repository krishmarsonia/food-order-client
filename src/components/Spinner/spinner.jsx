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
      <Spinner animation="border" />
    </div>
  );
};

export default WithSpinner;
