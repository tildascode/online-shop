import React, {Component} from 'react';
import './HomePage.scss';
import ScrollToTopOnMount from '../../shared/ScrollToTopOnMount';

import slideOne from '../../assets/home_page/slide_1.jpeg';
import slideTwo from '../../assets/home_page/slide_2.jpeg';
import slideThree from '../../assets/home_page/slide_3.jpeg';

import backgroundImage from '../../assets/home_page/food-background.jpeg';
import sliderImage from '../../assets/home_page/fresh-veggies.jpeg';
import productVectors from '../../assets/home_page/product-vectors.png';


const slides = [];
slides.push(slideOne, slideTwo, slideThree);

class HomePage extends Component {
    closeModal = () => {
        this.props.purchaseInit();
        this.props.closeModal();
    };
    render() {
        return (
          <>
              <ScrollToTopOnMount/>
              <div className="home-container">
                  <div style={{backgroundImage: `url(${backgroundImage})`}} className="sale row">
                      <h1 className="light">The Farmers Market Online</h1>
                      <p className="large light">Buy directly from local farmers, artisans, and other vendors in
                          your
                          community.</p>
                      <a href="/categories/1" className="btn btn-primary">Start Shopping</a>

                  </div>
                  <div className="row flex">
                      <div className="col-md-6">
                          <div className="half-image-left">
                              <div className="half-image" style={{backgroundImage: `url(${sliderImage})`}}></div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="half-text-right">
                              <img alt="Product" src={productVectors} className="item-icon"
                                   data-sr-id="5"/>
                              <h2>Easy,
                                  Convenient, and Transparent</h2>
                              <p>Know
                                  where your food comes from. Get products any day of the week from as many vendors as
                                  you'd like!</p>
                          </div>
                      </div>
                  </div>
                  <div style={{backgroundImage: `url(${slideOne})`}} className="sale row">
                      <div className="middle">
                          <h1 className="light">Are you a farmer?</h1>
                          <p className="large light">Sell directly to clients every day!</p>
                          <a href="/register" className="btn btn-primary">Start Selling</a>
                      </div>
                  </div>
                  {/*<div className="row slider">*/}
                  {/*     {slides.map(slide => (*/}
                  {/*       <div key={slide} style={{backgroundImage: `url('${slide}')`}} className="slide">*/}
                  {/*           <h1 className="light">Are you a farmer?</h1>*/}
                  {/*           <h3 className="subtitle light">Lorem ipsum dolor sit amet consectetur adipisicing elit.*/}
                  {/*               Voluptas,*/}
                  {/*               voluptate!</h3>*/}
                  {/*       </div>*/}
                  {/*     ))}*/}
                  {/* </div>*/}

              </div>
          </>
        )
    }
};


export default HomePage;