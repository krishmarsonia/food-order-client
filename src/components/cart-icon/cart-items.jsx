import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Container, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import axios from "axios";

import {
  selectCartItems,
  selectCartLoaded,
} from "../../redux/cart/cart-selectors";
import WithSpinner from "../Spinner/spinner";
import { seletId, selectToken } from "../../redux/user/user-selectors";
import {
  CartSet,
  SetCartCount,
  SetCartLoaded,
} from "../../redux/cart/cart-actions";
// import { ReactComponent as ShoppingIcon } from "../../util/shopping-cart-solid.svg";

import "./cartIcon.css";

const CartItemOnNav = (props) => {
  const {
    selectCartLoaded,
    setCartLoaded,
    setCart,
    history,
    cartItems,
    SetCartCount,
    selectToken
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  //if cart state is empty
  useEffect(() => {
    if (selectCartLoaded === false) {
      axios
        .get("http://localhost:5050/findcart", {
          headers: {
            Authorization: "Bearer " + selectToken,
          },
        })
        .then((sol) => {
          console.log(sol.data.cart.items);
          SetCartCount(0);
          setCartLoaded(true);
          setCart(sol.data.cart.items);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoading(false);
    }
  }, [selectCartLoaded, setCartLoaded, setCart, SetCartCount]);

  const cartComponentClickHandler = () => {
    if (selectToken) {
      history.push("/cart");
    } else {
      alert("Please Login Fist to Add the food items into the cart");
      history.push("/");
    }
  };

  return (
    <div>
      {isLoading ? (
        <WithSpinner isLoading={true} className="withspinneralign" />
      ) : (
        <div>
          {cartItems.length ? (
            cartItems.map((it) => (
              <Container key={it._id}>
                <Row className="heightPoos">
                  <Col style={{ alignItems: "center" }} xs={5}>
                    <img className="testImg" src={it.imageUrl} alt={it.name} />
                  </Col>
                  <Col style={{ margin: "auto" }}>{it.name}</Col>
                  <Col style={{ margin: "auto" }} md="auto">
                    ×{it.quantity}
                  </Col>
                </Row>
                <br />
              </Container>
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>No Items added into cart</h2>
          )}
          <br />
          <div className="cartBtn">
            <button
              onClick={cartComponentClickHandler}
              className="btn btn-primary"
            >
              Go to checkout page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  selectId: seletId(state),
  selectCartLoaded: selectCartLoaded(state),
  selectToken: selectToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCartLoaded: (bol) => dispatch(SetCartLoaded(bol)),
  setCart: (cart) => dispatch(CartSet(cart)),
  SetCartCount: (num) => dispatch(SetCartCount(num)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartItemOnNav)
);
