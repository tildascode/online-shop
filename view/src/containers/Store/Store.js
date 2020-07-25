import React, {Component} from 'react';
import './Store.scss';
import UserNavigation from '../../components/Navigation/NavigationItems/UserNavigation';
import Product from '../Product/Product';
import ScrollToTopOnMount from '../../shared/ScrollToTopOnMount';
import strings from '../../shared/LocalizedStrings';
import axios from "axios";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

class Store extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            products: []
        };
    }

    componentDidMount() {
        this.getProducts();
    };

    getProducts = () => {
        axios.get(
          process.env.REACT_APP_API_URL + 'user/products',
          { withCredentials: true }
        ).then((response) => {
            if (response.data) {
                this.setState({products: response.data, isFetching: false});
            } else {
                this.setState({products: [], isFetching: false});
            }
        });
    }

    render() {
        const {products} = this.state;
        return (
          <>
              <ScrollToTopOnMount/>
              <div className="store-container">
                  <div className="user-navigation">
                      <UserNavigation/>
                  </div>
                  <div className="store-wrapper">
                      <h2 className="user-page-heading"> {strings.store_products_title}</h2>
                          <TransitionGroup component="ul" className="store-products product-list">
                              {products.map(product => (
                                <CSSTransition key={product.code} classNames="fade" timeout={300}>
                                    <Product
                                      key={product.code}
                                      product={product}
                                    />
                                </CSSTransition>
                              ))}
                          </TransitionGroup>
                  </div>
              </div>
          </>
        );
    };
};
export default Store;