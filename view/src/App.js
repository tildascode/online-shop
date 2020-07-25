import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Layout from './layout/Layout';
import Store from './containers/Store/Store';
import CreateProduct from './containers/CreateProduct/CreateProduct';
import Details from './containers/Details/Details';
import ProductList from './containers/ProductList/ProductList';
import Wishlist from './containers/Wishlist/Wishlist';
import HomePage from './containers/HomePage/HomePage';
import Logout from './containers/Auth/Logout/Logout';


class App extends Component {
    render() {
        const isAuth = sessionStorage.getItem('userId') != null;

        return (
          <Fragment>
              <Layout>
                  <Switch>
                      {!isAuth && <Route path="/register" component={Register}/>}
                      {!isAuth && <Route path="/login" component={Login}/>}
                      {isAuth && <Route path="/logout" component={Logout}/>}
                      <Route path="/user/store" component={Store}/>
                      <Route path="/user/create" component={CreateProduct}/>
                      <Route path="/details/:code" component={Details}/>
                      <Route path="/categories/:code" component={ProductList}/>
                      <Route path="/search" component={ProductList}/>
                      <Route path="/wishlist" component={Wishlist}/>
                      <Route path="/" exact component={HomePage}/>
                      <Redirect to="/"/>
                  </Switch>
              </Layout>
          </Fragment>
        );
    }
};
export default App;
