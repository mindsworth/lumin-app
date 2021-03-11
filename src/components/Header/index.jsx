import React, { useState, useEffect } from "react";
import { get } from "idb-keyval";
import "./HeaderStyles.scss";

function Header() {
  const getCart = get("cart");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart.then((val) => {
      setCart(val);
    });
  }, [getCart]);

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
              <i className="fa fa-shopping-cart" aria-hidden="true" />
              <span className="count">{cart.length}</span>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
