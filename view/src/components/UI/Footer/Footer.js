import React from 'react';
import './Footer.scss';
import SocialMedia from '../SocialMedia/SocialMedia';

const footer = () => (
  <footer className="footer">
    <SocialMedia />
    <div className="support-section">
      <div className="support-wrapper">
        <div className="online-shop">
          <h4>Online Shop</h4>
          <p>How to Buy</p>
          <p>Questions</p>
          <p>Delivery cost</p>
          <p>Regulations</p>
        </div>
        <div className="about-us">
          <h4>About Us</h4>
          <p>Who We Are</p>
          <p>Social Media</p>
        </div>
        <div className="support">
          <h4>Support</h4>
          <p>Contacts</p>
          <p>Customer Service</p>
          <p>Privacy & Cookies</p>
          <p>Q&A</p>
        </div>
      </div>
    </div>
  </footer>
);

export default footer;