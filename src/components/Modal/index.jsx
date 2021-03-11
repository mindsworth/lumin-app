import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { get } from "idb-keyval";
import { FETCH_CURRENCY } from "../../graphQL/queries";
import "./ModalStyles.scss";
import CustomSelect from "../Select";
import CartCard from "../CartCard";

function Modal({ handleShowModal }) {
  const { loading, data } = useQuery(FETCH_CURRENCY);
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

  useEffect(() => {
    return () => {
      setCurrency([]);
      setCart([]);
    };
  }, []);

  const options = currency.map((item) => ({ value: item, label: item }));

  const totalPrice = cart.reduce((acc, cur) => acc + cur.price * cur.count, 0);

  const closeModal = () => {
    handleShowModal(false);
  };

  return (
    <div className="modal">
      <div className="dialog">
        <div className="dialog__header">
          <div className="back-btn" onClick={closeModal}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </div>
          <div className="title">Your Cart</div>
        </div>

        <div className="dialog__body">
          {loading && (
            <div className="loading-state">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {!loading && cart.length > 0 && (
            <div className="select">
              <CustomSelect
                placeholder="Currency"
                classNamePrefix="modal-select"
                options={options}
              />
            </div>
          )}
          {!loading && (
            <div className="cart-list">
              {cart.length === 0 && (
                <div className="empty-state">No item in cart!!!</div>
              )}
              {cart.length > 0 &&
                cart.map((item) => <CartCard key={item.id} data={item} />)}
            </div>
          )}
          {!loading && cart.length > 0 && (
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
