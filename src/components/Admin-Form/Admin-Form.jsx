import React from "react";
import { Row, Col } from "react-bootstrap";

import LabelInput from "../../components/label-input/label-input";

const AdminForm = ({ name, child, onchag, val, type }) => {
  return (
    <div>
      <Row>
        <Col>
          <div className="Admin_Food_Label">
            <label htmlFor={name}>
              <h6>{child}</h6>{" "}
            </label>
          </div>
        </Col>
        <Col>
          <LabelInput 
            InputName={child}
            labelFor={name}
            onchange={onchag}
            value={val}
            type={type}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AdminForm;
