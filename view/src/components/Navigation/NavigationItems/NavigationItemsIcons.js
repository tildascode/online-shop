import React from 'react';
import NavigationItem from './NavigationItem';

import userIcon from '../../../assets/icons/user.png';
import heartIcon from '../../../assets/icons/heart.svg';
import logoutIcon from '../../../assets/icons/logout.svg';
const isAuth = sessionStorage.getItem('userId') != null;
const navigationItemsIcons = () => (
  <ul className="navigation-icons-list">
      {!isAuth
        ? <NavigationItem link="/login" exact>
            LOGIN
        </NavigationItem>
        : <NavigationItem link="/user/store" exact>
            <img className="icon" src={userIcon} alt="profile"/>
        </NavigationItem>
      }
      {isAuth
        ?
        <NavigationItem link="/wishlist" exact>
            <img className="icon" src={heartIcon} alt="wishlist"/>
        </NavigationItem>
        : ''
      }
      {isAuth
        ? <NavigationItem link="/logout" exact>
            <img className="icon" src={logoutIcon} alt="logout"/>
        </NavigationItem>
        : ''
      }
  </ul>
);

export default navigationItemsIcons;