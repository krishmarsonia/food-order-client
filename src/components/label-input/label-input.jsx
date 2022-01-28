import React from "react";
import { InputGroup,FormControl } from "react-bootstrap";

import './labelInput.css'

const LabelInput = ({size, InputName, labelFor, type, onchange, value}) => {
  return (
    <div>
      <InputGroup className={'w-75 mb-3'} >
        <FormControl
          // size="w-75"
          autoComplete="ON"
          placeholder={InputName}
          aria-label={labelFor}
          aria-describedby="basic-addon1"
          onChange={onchange}
          type={type}
          value={value}
        />
      </InputGroup>
    </div>
  );
};

export default LabelInput;
