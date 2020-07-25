import React, {Component} from 'react';
import './Product.scss';
import {Link} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

class Product extends Component {
    state = {
        isLoaded: false,
        isError: false
    };

    componentDidMount() {
        this.load(this.img);
    };

    load = img => {
        let image = img;
        image.src = this.props.product.medias[0];
        image.onload = () => {
            this.onImageLoaded();
        };

        image.onError = () => {
            this.onImageLoadError(this.props.product.medias[0]);
        };
    };

    onImageLoaded = () => {
        this.setState({
            isLoaded: true
        });
    };

    onImageLoadError = () => {
        this.setState({
            isError: true
        });
    };

    render() {
        const {code, img, price, name} = this.props.product;

        return (
          <Link to={`/details/${code}`}>
              <div className="product">
                  <div className="img-wrapper">
                      {!this.state.isLoaded && <Spinner/>}
                      <img ref={(img) => this.img = img} className="product-img" src={img} alt={name}/>
                  </div>
                  <p className="info">{name}</p>
                  <p className="info">Price: {price}.00 $</p>
              </div>
          </Link>
        )
    }
};

export default Product;