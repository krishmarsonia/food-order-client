import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";

import CartItemsOnNav from "../cart-icon/cart-items";
import { ReactComponent as ShoppingIcon } from "../../util/shopping-cart-solid.svg";
import {
  selectUserName,
  selectAdmin,
  seletId,
} from "../../redux/user/user-selectors";
import {
  CartEmpty,
  SetCartCount,
  SetCartLoaded,
} from "../../redux/cart/cart-actions";
import {
  selectCartItemsCount,
  selectCartItems,
  selectCartCount,
} from "../../redux/cart/cart-selectors";
import {
  setAdminFalse,
  setAdmin,
  setCurrentUserName,
  setFoodData,
  setUserId,
} from "../../redux/user/user-actions";

import "./navbar.css";

function NavbarComponent(props) {
  const datecomparer = () => {
    const dates = new Date();
    if (dates.getHours() < 12) {
      return "Good morning";
    } else if (dates.getHours() >= 12 && dates.getHours() < 18) {
      return "Good afternoon";
    } else {
      return "Good Evening";
    }
  };
  const setUserCount = () => {
    
    if(props.count === 0 && props.cout === 0){
      return 0
    }else if(props.count === 0){
      return props.cout
    }else{
      return props.count
    }
  }

  console.log(setUserCount());
  const signoutClickHandler = () => {
    axios.post("http://localhost:5050/cartAdd", {
      data: {
        cartArray: props.cart,
        // userid: props.userId,
      },
    },{
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });

    console.log(props.cart);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    props.CartEmpty();
    props.setCurrentUserName("");
    props.setAdmin(false);
    props.setfoodArr(null);
    props.setUserId("");
    props.SetCartCount(0);
    props.SetCartLoaded(false);
  };
  console.log(props.count);
  console.log(props.cout);
  return (
    <div className="container">
      <Navbar className="nav" fixed="top">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand as={Link} to="/home">
              Food-Order
            </Navbar.Brand>
            {/* <Nav.Link as={Link} to="/">
              Home
            </Nav.Link> */}

            {props.admin ? (
              <Nav.Link as={Link} to="/adminfood">
                Admin Food
              </Nav.Link>
            ) : null}
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}

            {/* <Nav.Link ><CartIcon style={{height: 25, width: 20}}/></Nav.Link> */}
          </Nav>

          {localStorage.getItem("token") ? (
            <Nav.Link as={Link} to="/" onClick={signoutClickHandler}>
              <span className="signOut">Signout</span>
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/">
              <span className="signOut">Signin/Register</span>
            </Nav.Link>
          )}

          {props.username ? (
            <span className="heightPos">
              {["bottom"].map((placement) => (
                <OverlayTrigger
                  trigger="click"
                  key={placement}
                  placement={placement}
                  overlay={
                    <Popover id={`popover-positioned-${placement}`}>
                      {/* <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header> */}
                      <Popover.Content
                        style={{ backgroundColor: "white" }}
                        className="heightPos"
                      >
                        <CartItemsOnNav />
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <Nav.Link className="colorClass">
                    <ShoppingIcon
                      className={props.count > 9 ? "shopCon" : "shop"}
                    />
                    <span className="numCart">{setUserCount()}</span>
                  </Nav.Link>
                </OverlayTrigger>
              ))}
            </span>
          ) : null}
        </Container>
      </Navbar>
      <br />
      {/* <CartIcon /> */}
      <p style={{ float: "right", margin: "0px", padding: "0px" }}>
        {" "}
        {props.username ? datecomparer() + "," : ""} {props.username}
        {/* hello, {localStorage.getItem('userName')} */}
        {/* {localStorage.getItem("userName")
          ? "hello, " + localStorage.getItem("userName")
          : null} */}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: selectUserName(state),
  count: selectCartItemsCount(state),
  admin: selectAdmin(state),
  cart: selectCartItems(state),
  userId: seletId(state),
  cout: selectCartCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserName: (UserName) => dispatch(setCurrentUserName(UserName)),
  CartEmpty: () => dispatch(CartEmpty()),
  setAdmin: (admin) => dispatch(setAdmin(admin)),
  setfoodArr: (food) => dispatch(setFoodData(food)),
  setUserId: (id) => dispatch(setUserId(id)),
  SetCartCount: (val) => dispatch(SetCartCount(val)),
  SetCartLoaded: (bol) => dispatch(SetCartLoaded(bol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
