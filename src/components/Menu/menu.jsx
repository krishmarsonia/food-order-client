import React, { useEffect, useState } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";

import { AddItemToCart } from "../../redux/cart/cart-actions";
import {
  setisFetching,
  fetchCollectionStart,
} from "../../redux/user/user-actions";
import WithSpinner from "../Spinner/spinner";
import { setFoodData } from "../../redux/user/user-actions";
import { selectFoodData } from "../../redux/user/user-selectors";
import {
  selectisfetching,
  selectboolFoodData,
} from "../../redux/user/user-selectors";

import "./menu.css";

const Menu = ({
  match,
  foodArr,
  setFoodData,
  setisLoading,
  isFetching,
  fetchCollectionStart,
  AddItemToCart,
  selectboolFoodData,
}) => {
  // console.log(props.prop.match.params.foodId)
  const fId = match.params.foodId;
  var stypes;
  if (fId === "12") {
    stypes = "Pizza";
  } else if (fId === "13") {
    stypes = "Sandwich";
  } else if (fId === "14") {
    stypes = "Pasta";
  } else if (fId === "15") {
    stypes = "Burger";
  } else if (fId === "16") {
    stypes = "Panner";
  } else {
    stypes = "No food Added yet";
  }

  // console.log(foodArr);
  // const objarr = Object.assign({}, foodArr.data.foodData);
  // console.log(objarr);

  // useEffect(() => {
  // redux thunk
  if (!foodArr) {
    
    // setisLoading(true);
    fetchCollectionStart();
    
    // setItem(item);
  } else {
    console.log("KHello");
    setisLoading(false);
  }
  // }, [fetchCollectionStartAsync, foodArr, setisLoading]);

  // useEffect(() => {
  function BtnClickHandler(item) {
    // console.log(item);
    if (localStorage.getItem("token")) {
      AddItemToCart(item);
    } else {
      alert("Please Login Fist to Add the food items into the cart");
      // props.history.push('/');
    }
  }
  // })

  return (
    <div>
      {/* {console.log(foodArr)} */}
      {console.log(isFetching)}
      {console.log(!selectboolFoodData)}
      {/* {console.log(foodArr)} */}
      {isFetching && !selectboolFoodData
        ? console.log("its working")
        : console.log("its not")}

      {isFetching && !selectboolFoodData ? (
        <WithSpinner isLoading={isFetching} />
      ) : (
        <div className="container">
          <h1 className="center">Available Menu</h1>
          {/* {console.log(foodArr.data)} */}
          <h3>{stypes}</h3>
          {foodArr ? (
            foodArr.data.foodData
              .filter((fs) => fs.type === stypes)
              .map((i) => (
                <div key={i._id}>
                  
                  <Row className="rows">
                    <Col xs={2}>
                      <img
                        src={i.imageUrl}
                        alt="pizza"
                        className="img-responsive kiimage"
                      />
                    </Col>
                    <Col xs={7} className="midcol">
                      <h2>{i.name}</h2>
                      <p>{i.description}</p>
                      <h5>Rs. {i.price}</h5>
                    </Col>
                    <Col>
                      <Button
                        value={i}
                        onClick={() => BtnClickHandler(i)}
                        className="btmenu btn btn-success"
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <br />
                </div>
              ))
          ) : (
            <h1>food not added yet</h1>
          )}
          {console.log(isFetching + " " + !selectboolFoodData)}

          {/* sample if needed in future*/}
          {/* <Row className="rows">
          <Col xs={2}>
            <img
              src="https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80"
              alt="pizza"
              className="kiimage"
            />
          </Col>
          <Col xs={7} className="midcol">
            <h2>Margereta</h2>
            <p>The delightfull margereta</p>
            <h5>RS. 300</h5>
          </Col>
          <Col>
            <Button className="btmenu btn btn-success">Add</Button>
          </Col>
        </Row>
        */}
          <br />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  foodArr: selectFoodData(state),
  isFetching: selectisfetching(state),
  selectboolFoodData: selectboolFoodData(state),
});

const MapDispatchToProps = (dispatch) => ({
  AddItemToCart: (CartItem) => dispatch(AddItemToCart(CartItem)),
  setFoodData: (food) => dispatch(setFoodData(food)),
  setisLoading: (val) => dispatch(setisFetching(val)),
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(Menu));
