import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";

import NavbarComponent from "../../components/Navbar/navbar";
import CartDisplay from "../../components/Cart-Display/Cart-Display";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button";
import {
  selectCartItems,
  selectCartItemsTotal,
} from "../../redux/cart/cart-selectors";
import {
  DeleteItemFromCart,
  AddItemToCart,
  CartItemDecrease,
} from "../../redux/cart/cart-actions";

import "./Cart-Page.css";

const CartPage = ({
  cartItems,
  total,
  DeleteItemFromCart,
  AddItemToCart,
  CartItemDecrease,
}) => {
  const IncreaseItemClickHandler = (item) => {
    AddItemToCart(item);
  };
  const RemoveItemClickHandler = (item, e) => {
    // console.log(item);
    DeleteItemFromCart(item);
  };
  const DecreaseItemClickHandler = (item) => {
    // console.log("KRish")
    CartItemDecrease(item);
  };
  return (
    <div className="container CartCenter">
      <NavbarComponent />
      <br />
      <br />
      <Container>
        <Row>
          <Col xs={3}>Food</Col>
          <Col xs={3}>Name</Col>
          <Col xs={2}>Quantity</Col>
          <Col xs={2}>Price</Col>
          <Col xs={2}>Remove</Col>
        </Row>
        <hr />
        <br />
        {cartItems.length ? (
          cartItems.map((cit) => (
            <div key={cit.id} style={{ margin: "auto" }}>
              <CartDisplay
                cditem={cit}
                dec={DecreaseItemClickHandler}
                inc={IncreaseItemClickHandler}
                rem={RemoveItemClickHandler}
              />
              <br />
            </div>
          ))
        ) : (
          <h2>No Items are added into the cart</h2>
        )}
      </Container>
      <hr />
      <h1 style={{ float: "right" }}>Total: Rs. {total}</h1>
      <br />
      <div className="warningText">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/22 - cvv: 123
      </div>
      <div className="cartPaymentButton">
        <StripeCheckoutButton price={total} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  DeleteItemFromCart: (cartItem) => dispatch(DeleteItemFromCart(cartItem)),
  AddItemToCart: (cartItem) => dispatch(AddItemToCart(cartItem)),
  CartItemDecrease: (cartItem) => dispatch(CartItemDecrease(cartItem)),
});

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  total: selectCartItemsTotal(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
