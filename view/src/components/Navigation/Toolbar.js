import React from 'react';
import './Navigation.scss';
import NavigationItems from './NavigationItems/NavigationItems';
import NavigationItemsIcons from './NavigationItems/NavigationItemsIcons';

import logo from '../../assets/icons/logo.png';
import menuIcon from '../../assets/icons/bars_white.png';
import SearchBar from "./Search/SearchBar";

const toolbar = ({toggleSideDrawer}) => (
  <header className="header">
      <div className="top-wrapper">
          <button onClick={toggleSideDrawer} className="toggle-side-drawer">
              <img src={menuIcon} alt="menu button"/>
          </button>
          <a href="/"><img className="logo" src={logo} alt="Online Farmers"/></a>
          <nav className="search"><SearchBar/></nav>
          <nav className="navigation-icons">
              <NavigationItemsIcons/>
          </nav>
      </div>
      <div className="bottom-wrapper">
          <nav className="navigation">
              <NavigationItems/>
          </nav>
      </div>
  </header>
);

export default toolbar;