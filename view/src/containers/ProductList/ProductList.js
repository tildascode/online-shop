import React, {Component} from 'react';
import './ProductList.scss';
import {Redirect} from 'react-router-dom';
import Product from '../Product/Product';
import ScrollToTopOnMount from '../../shared/ScrollToTopOnMount';
import axios from "axios";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

class ProductList extends Component {

    constructor(props) {
        super(props);
        const search = new URLSearchParams(this.props.location.search).get("q");
        const {code} = this.props.match.params;

        this.state = {
            products: [],
            checkboxValue: 'relevance',
            code: code,
            search: search
        };
    }

    componentDidMount() {
        this.getProducts();
    };


    getProducts = () => {
        if (this.state.code) {
            this.getCategoryProducts(this.state.code)
        } else if (this.state.search) {
            this.getSearchProducts(this.state.search)
        }
    }

    getCategoryProducts = (code) => {
        axios.get(
            process.env.REACT_APP_API_URL + 'c/' + code,
        ).then((response) => this.setProductsInState(response))
        .catch((err) => console.log(err));
    }

    getSearchProducts = (search) => {
        axios.get(
            process.env.REACT_APP_API_URL + 'search?q=' + search,
        ).then((response) => this.setProductsInState(response))
    }

    setProductsInState = (response) => {
        if (response.data) {
            this.setState({products: response.data});
        } else {
            this.setState({products: []});
        }
    }

    handleChange = (e) => {
        this.props.handleCheckboxValue(e.target.value);
        this.props.handleDirection();
        this.props.sortProducts('price', 'id');
    };


    render() {
        const {products, checkboxValue} = this.state;
        if (!products) {
            return <Redirect to="/"/>
        }
        ;

        return (

            <>
                <ScrollToTopOnMount/>
                <div className="product-container">
                    <div className="filter-panel">
                        Sort by:
                        <select onChange={this.handleChange} value={checkboxValue}>
                            <option value="relevance">Relevance</option>
                            <option value="price - low to high">Price - low to high</option>
                            <option value="price - high to low">Price - high to low</option>
                        </select>
                        <p className="products-amount">Results: <span className="amount">{products.length}</span></p>
                    </div>
                    <div className="product-list-wrapper">
                        <div/>
                        <TransitionGroup component="ul" className="product-list">
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
export default ProductList;