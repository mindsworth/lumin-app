import React, { useState, useEffect, useContext } from "react";
import "./HeaderStyles.scss";
import { CartsContext } from "../../contexts/CartsContext";
import { ModalContext } from "../../contexts/ModalContext";

function Header() {
  const { carts } = useContext(CartsContext);
  const { setVisibility } = useContext(ModalContext);

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
            <div className="cart-icon" onClick={setVisibility}>
              <i className="fa fa-shopping-cart" aria-hidden="true" />
              <span className="count">{carts.length}</span>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
