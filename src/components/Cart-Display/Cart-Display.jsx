import React from "react";
import {Row, Col} from 'react-bootstrap'

const CartDisplay = ({cditem, dec, inc, rem}) => {
    const {imageUrl, name, quantity, price} = cditem
    return(
        <div>
            <Row>
                <Col xs={3}>
                  <img
                    className="CartPageImg"
                    src={imageUrl}
                    alt={name}
                  />
                </Col>
                <Col xs={3} className="my-auto">
                  <h5>{name}</h5>
                </Col>
                <Col xs={2} className="my-auto">
                  <div className="cartFlex">
                    <div className="CartLG">
                      <h5 onClick={() => dec(cditem)}>
                        &lt;
                      </h5>
                    </div>
                    <span className="cartMargin">
                      <h5>{quantity}</h5>
                    </span>
                    <div
                      className="CartLG"
                      onClick={() => inc(cditem)}
                    >
                      <h5>&gt;</h5>
                    </div>
                  </div>
                </Col>
                <Col xs={2} className="my-auto">
                  <h5>{price}</h5>
                </Col>
                <Col
                  xs={2}
                  className="my-auto CartLG"
                  onClick={() => rem(cditem)}
                >
                  <h5>×</h5>
                </Col>
                <br />
              </Row>
        </div>
    )
}

export default CartDisplay