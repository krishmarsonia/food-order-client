import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./pages/homePage/home-page";
import MenuPage from "./pages/AvailableMenu/menu-page";
import Signin from "./pages/sign-in-up/signin-page";
import AdminFood from "./pages/Admin/admin-food";
import CartPage from "./pages/Cart-Page/Cart-Page";
// import {Provider} from 'react-redux';
// import store from './redux/store';
import { selectAdmin, selectUserName } from "./redux/user/user-selectors";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// const getLayout = (user) => {
//   if (user) {
//   }
// };

class App extends React.Component {
  // constructor(){
  // }

  render(){
    const { userName, Admin } = this.props
    return (
      <div className="App">
        {/* {getLayout(props.user)} */}
        {/* <Provider store={store}> */}
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route path="/food/:foodId" component={MenuPage} />
          <Route
            exact
            path="/"
            
            render={() => (userName ? <Redirect to='/home' /> : <Signin />)}
          />
          <Route
            path="/adminfood"
            render={() => (!Admin ? <Redirect to="/" /> : <AdminFood />)}
          />
          <Route
            path="/cart"
            render={() => (!userName ? <Redirect to="/" /> : <CartPage />)}
          />
        </Switch>
        {/* </Provider> */}
      </div>
    );
  }
  }

const mapStatetoProps = (state) => ({
  Admin: selectAdmin(state),
  userName: selectUserName(state),
});

export default connect(mapStatetoProps)(App);
