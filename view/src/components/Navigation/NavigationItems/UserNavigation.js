import React from 'react';
import '../Navigation.scss';
import NavigationItem from './NavigationItem';
import strings from '../../../shared/LocalizedStrings';

const sideNavigation = () => (
  <nav className="side-navigation">
      <ul className="side-navigation-list">
          <NavigationItem
            key="user-navigation-profile"
            link="/user/profile">
              {strings.user_navigation_profile}
          </NavigationItem>
          <NavigationItem
            key="user-navigation-store"
            link="/user/store">
              {strings.user_navigation_products}
          </NavigationItem>
          <NavigationItem
            key="user-navigation-new-product"
            link="/user/create">
              {strings.user_navigation_new_product}
          </NavigationItem>
      </ul>
  </nav>
);

export default sideNavigation;