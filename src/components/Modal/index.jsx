import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { get, values } from "idb-keyval";
import { FETCH_CURRENCY } from "../../graphQL/queries";
import "./ModalStyles.scss";
import CustomSelect from "../Select";
import CartCard from "../CartCard";

function Modal({ handleShowModal }) {
  const { error, loading, data } = useQuery(FETCH_CURRENCY);
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState([]);

  const getCart = get("cart");

  useEffect(() => {
    getCart.then((val) => {
      setCart(val);
    });
  }, [getCart]);

  useEffect(() => {
    if (data) {
      setCurrency(data.currency);
    }
  }, [data]);

  const options = currency.map((item) => ({ value: item, label: item }));

  const totalPrice = cart.reduce((acc, cur) => acc + cur.price * cur.count, 0);

  return (
    <div className="modal">
      <div className="dialog">
        <div className="dialog__header">
          <div className="back-btn" onClick={() => handleShowModal(false)}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </div>
          <div className="title">Your Cart</div>
        </div>
        <div className="dialog__body">
          {cart.length > 0 && (
            <div className="select">
              <CustomSelect
                placeholder="Currency"
                classNamePrefix="modal-select"
                options={options}
              />
            </div>
          )}
          <div className="cart-list">
            {cart.length === 0 && (
              <div className="empty-state">No item in cart!!!</div>
            )}
            {cart.length > 0 &&
              cart.map((item) => <CartCard key={item.id} data={item} />)}
          </div>
          {cart.length > 0 && (
            <div className="total">
              <div className="label">Subtotal</div>
              <div className="value">${totalPrice}</div>
            </div>
          )}
        </div>
        <div className="dialog__footer">
          <button className="btn">Make this a subscription (save 20%)</button>
          <button className="btn proceed-btn">Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
