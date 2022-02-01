import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
// import { Card, Button } from "react-bootstrap";

import Cards from "../../components/Card/Card";
import WithSpinner from "../../components/Spinner/spinner";
import NavbarComponent from "../../components/Navbar/navbar";
import { SetCartCount } from "../../redux/cart/cart-actions";
import { selectCartLoaded } from "../../redux/cart/cart-selectors";
import CarouselComponent from "../../components/Carousel/Carousel";

import "./home-page.css";

const HomePage = ({ selectCartLoaded, setCount }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectCartLoaded === false && !(token === null)) {
      axios
        .get(
          "http://localhost:5050/findcount",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          setCount(res.data.quantity);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCount(0);
          setIsLoading(false)
        });
    } else {
      setIsLoading(false);
    }
  }, [selectCartLoaded, setCount, setIsLoading, token]);
  return (
    <div>
      {isLoading ? (
        <WithSpinner isLoading={true} />
      ) : (
        <div className="container HomeCenter">
          <NavbarComponent />
          <br />
          {/* name */}
          <h1 className="title">Welcome to food Ordering website</h1>
          <br />
          <CarouselComponent />
          <br /> <br />
          <Cards />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectCartLoaded: selectCartLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCount: (num) => dispatch(SetCartCount(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
