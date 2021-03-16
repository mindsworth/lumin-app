import React, { useContext, useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { compact, map, isEqual, some } from "lodash";
import { useQuery, useLazyQuery } from "@apollo/client";
import { FETCH_CURRENCY, FETCH_PRODUCTS } from "../../graphQL/queries";
import "./ModalStyles.scss";
import CustomSelect from "../Select";
import CartCard from "../CartCard";
import { CartsContext } from "../../contexts/CartsContext";

function Modal({ handleShowModal }) {
  const {
    carts,
    refresh,
    setCarts,
    selectCurrency,
    setSelectCurrency,
  } = useContext(CartsContext);
  const currencyQuery = useQuery(FETCH_CURRENCY);

  const [fetchProducts, products] = useLazyQuery(FETCH_PRODUCTS);

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    if (currencyQuery.data) {
      setCurrencies(currencyQuery.data.currency);
    }
    return () => {
      setCurrencies([]);
    };
  }, [currencyQuery.data]);

  useEffect(() => {
    if (products.data) {
      updateCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.data]);

  const updateCart = () => {
    const newCarts = compact(
      map(products.data.products, (product) => {
        let currentCart;
        const isIncluded = some(carts, (cart) => {
          currentCart = cart;
          return isEqual(currentCart.title, product.title);
        });
        if (isIncluded) {
          return { ...currentCart, ...product };
        }
        return false;
      })
    );

    setCarts(newCarts);
  };

  const options = currencies.map((item) => ({ value: item, label: item }));

  const totalPrice = carts.reduce((acc, cur) => acc + cur.price * cur.count, 0);

  const closeModal = () => {
    handleShowModal(false);
  };

  const loading = products.loading || currencyQuery.loading;

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
          {!currencyQuery.loading && carts.length > 0 && (
            <div className="select">
              <CustomSelect
                placeholder="Currency"
                classNamePrefix="modal-select"
                value={selectCurrency}
                options={options}
                onChange={(select) => {
                  setSelectCurrency(select);
                  fetchProducts({
                    variables: {
                      currency: select.value,
                    },
                  });
                }}
              />
            </div>
          )}
          {loading && (
            <div className="loading-state">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {!loading && (
            <div className="cart-list">
              {carts.length === 0 && (
                <div className="empty-state">No item in cart!!!</div>
              )}
              {carts.length > 0 &&
                carts.map((item) => (
                  <CartCard
                    key={item.id}
                    data={item}
                    currency={getSymbolFromCurrency(selectCurrency.value)}
                    refresh={refresh}
                  />
                ))}
            </div>
          )}
          {!loading && carts.length > 0 && (
            <div className="total">
              <div className="label">Subtotal</div>
              <div className="value">
                {getSymbolFromCurrency(selectCurrency.value)}
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
