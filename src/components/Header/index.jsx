import React from "react";
import "./HeaderStyles.scss";

function Header() {
  return (
    <header className="header">
      <div className="logo">LUMIN</div>
      <nav className="main-nav">
        <ul className="main-nav__left">
          <li>Shop</li>
          <li>Learn</li>
        </ul>
        <ul className="main-nav__right">
          <li>Account</li>
          <li>
            <div className="cart-icon">
              <i class="fa fa-shopping-cart" aria-hidden="true" />
              <span className="count">3</span>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
