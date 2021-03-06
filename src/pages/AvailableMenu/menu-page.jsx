import "./manu-page.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Menu from "../../components/Menu/menu";
import WithSpinner from "../../components/Spinner/spinner";
import NavbarComponent from "../../components/Navbar/navbar";
import { selectCartLoaded } from "../../redux/cart/cart-selectors";
import {
  CartSet,
  SetCartCount,
  SetCartLoaded,
} from "../../redux/cart/cart-actions";
import { selectToken } from '../../redux/user/user-selectors';

const MenuPage = ({
  selectCartLoaded,
  SetCartLoaded,
  setCart,
  SetCartCount,
  selectToken
}) => {
  const token = selectToken;
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (selectCartLoaded === false && !(token === null)) {
      axios
        .get("http://localhost:5050/findcart", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data.cart.items);
          SetCartCount(0);
          SetCartLoaded(true);
          setCart(res.data.cart.items);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCart([]);
          setisLoading(false);
        });
    } else {
      setisLoading(false);
    }
  }, [selectCartLoaded, SetCartLoaded, setCart, SetCartCount, token]);
  return (
    <div>
      {isLoading ? (
        <WithSpinner isLoading={true} />
      ) : (
        <div className="container MenuCenter">
          <NavbarComponent />
          <Menu />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectCartLoaded: selectCartLoaded(state),
  selectToken: selectToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  SetCartLoaded: (bol) => dispatch(SetCartLoaded(bol)),
  setCart: (cart) => dispatch(CartSet(cart)),
  SetCartCount: (num) => dispatch(SetCartCount(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
