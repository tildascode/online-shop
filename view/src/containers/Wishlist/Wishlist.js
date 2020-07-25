import './Wishlist.scss';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import React, {Component} from 'react';
import WishlistItem from './WishlistItem/WishlistItem';
import Button from '../../components/UI/Button/Button';
import ScrollToTopOnMount from '../../shared/ScrollToTopOnMount';
import axios from "axios";

class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        this.getProducts();
    };

    getProducts = () => {
        axios.get(
          process.env.REACT_APP_API_URL + 'user/wished',
          {withCredentials: true}
        ).then((response) => {
            if (response.data) {
                this.setState({products: response.data});
            } else {
                this.setState({products: []});
            }
        });
    }
        render()
        {
            const wishlist = this.state.products;
            let list;
            (wishlist === 0) ? list =
                <p className="main-info" style={{marginTop: '20px', fontWeight: '500'}}>You do not have any products on the
                    list
                    yet.</p> :
              list = (
                <TransitionGroup component="ul" className="wishlist-list">
                    {wishlist.map(item => (
                      <CSSTransition key={item.code} classNames="fade" timeout={300}>
                          <WishlistItem item={item}/>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              );

            return (
              <>
                  <ScrollToTopOnMount/>
                  <div className="wishlist-container">
                      <h2 className="main-title">Wishlist</h2>
                      <p className="main-info">Your favorite foods here:</p>
                      {list}
                      <Button clicked="" btnType="dark">Clear Wishlist</Button>
                  </div>
              </>
            )
        }
};


export default WishList;