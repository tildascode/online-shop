import React, {Component} from 'react';
import './DetailItem.scss';
import {Redirect} from 'react-router-dom';
import Button from "../../../components/UI/Button/Button";
import ContactRetailer from "../ContactRetailer/ContactRetailer"
import axios from "axios";

class DetailItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            wished: false,
            isFetching: false,
        };
    }

    componentDidMount() {
        this.getProduct();
    };

    getProduct = () => {
        axios.get(
          process.env.REACT_APP_API_URL + 'products/' + this.props.code,
          {withCredentials: true}
        ).then((response) => {
            if (response.data) {
                const data = response.data;
                this.setState({product: data, wished: data.wished});
            } else {
                //redirect
            }
        });
    };

    addToWishList = (code) => {
        axios.get(
          process.env.REACT_APP_API_URL + 'user/wish/' + code,
          {withCredentials: true}
        ).then((response) => {
            this.setState({wished: true});
        });
    };

    render() {
        if (this.state.product === null) return <Redirect to="/"/>;

        const {code, price, name, description, medias, userId} = this.state.product;

        return (
          <li className="detail-item">
              <h3 className="detail-title">{name}</h3>
              <p className="detail-value">{description}</p>
              <div className="detail-content">
                  <div className="detail-img-wrapper">
                      <img src={medias ? medias[0] : ''} alt="" className="detail-item-img"/>
                  </div>
                  <div className="detail-info">
                      <div className="product-description">
                          <h3 className="detail-subtitle">Description:</h3>
                          <p className="detail-value">{description} </p>
                          <h3 className="detail-subtitle">Retailer:</h3>
                          <p className="detail-value">{userId}</p>
                          <h3 className="detail-subtitle">Price: {price}.00 $</h3>
                      </div>
                      <div className="button-wrapper">
                          <Button
                            clicked={() => this.addToWishList(code)}
                            disabled={this.state.wished}>
                              {this.state.wished ?
                                (<p>In Wishlist</p>) :
                                (<p>Add to Wishlist</p>)
                              }
                          </Button>
                      </div>
                      <div className="button-wrapper">
                          <ContactRetailer retailerEmail={userId}></ContactRetailer>
                      </div>
                  </div>
              </div>
          </li>
        )
    }
};

export default DetailItem;