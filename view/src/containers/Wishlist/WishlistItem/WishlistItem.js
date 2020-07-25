import React from 'react';
import './WishlistItem.scss';
import { Link } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';

const wishlistItem = (props) => {
  const { code, name, medias,userId, description, price } = props.item;

  return (
    <li className="wishlist-item">
      <h3 className="wishlist-title">{name}</h3>
      <p className="wishlist-value">{userId}</p>
      <div className="wishlist-content">
        <div className="wishlist-img-wrapper">
          <img src={medias[0]} alt="" className="wishlist-item-img" />
        </div>
        <div className="wishlist-info">
          <h3 className="wishlist-subtitle">Description:</h3>
          <p className="wishlist-value">{description}</p>
          <h3 className="wishlist-subtitle">Price: {price}.00 $</h3>
          <div className="btn-wrapper">
            <Link to={`/details/${code}`}>
              <Button clicked="" >Show Details</Button>
            </Link>
            <Button clicked="" btnType="dark">Remove</Button>
          </div>
        </div>
      </div>
    </li>
  );
};




export default  wishlistItem;