import React, { useContext, useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { useQuery } from "@apollo/client";
import { FETCH_CURRENCY, FETCH_PRODUCTS } from "../../graphQL/queries";
import "./ModalStyles.scss";
import CustomSelect from "../Select";
import CartCard from "../CartCard";
import { CartsContext } from "../../contexts/CartsContext";

function Modal({ handleShowModal }) {
  const { carts, refresh } = useContext(CartsContext);
  const currencyQuery = useQuery(FETCH_CURRENCY);
  const products = useQuery(FETCH_PRODUCTS, {
    variables: {
      currency: "USD",
    },
  });
  const [selectCurrency, setSelectCurrency] = useState("usd");
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    if (currencyQuery.data) {
      setCurrencies(currencyQuery.data.currency);
    }
    return () => {
      setCurrencies([]);
    };
  }, [currencyQuery.data]);

  const options = currencies.map((item) => ({ value: item, label: item }));

  const totalPrice = carts.reduce((acc, cur) => acc + cur.price * cur.count, 0);

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
          {currencyQuery.loading && (
            <div className="loading-state">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {!currencyQuery.loading && carts.length > 0 && (
            <div className="select">
              <CustomSelect
                placeholder="Currency"
                classNamePrefix="modal-select"
                options={options}
                onChange={(select) => setSelectCurrency(select.value)}
              />
            </div>
          )}
          {!currencyQuery.loading && (
            <div className="cart-list">
              {carts.length === 0 && (
                <div className="empty-state">No item in cart!!!</div>
              )}
              {carts.length > 0 &&
                carts.map((item) => (
                  <CartCard key={item.id} data={item} refresh={refresh} />
                ))}
            </div>
          )}
          {!currencyQuery.loading && carts.length > 0 && (
            <div className="total">
              <div className="label">Subtotal</div>
              <div className="value">
                {getSymbolFromCurrency(selectCurrency)}
                {totalPrice}
              </div>
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
