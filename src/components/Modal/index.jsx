import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { get } from "idb-keyval";
import { FETCH_CURRENCY } from "../../graphQL/queries";
import "./ModalStyles.scss";
import CustomSelect from "../Select";

function Modal() {
  const { error, loading, data } = useQuery(FETCH_CURRENCY);
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    get("cart").then((val) => {
      setCart(val);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setCurrency(data.currency);
    }
  }, [data]);

  const options = currency.map((item) => ({ value: item, label: item }));

  return (
    <div className="modal">
      <div className="dialog">
        <div className="dialog__header">
          <div className="back-btn">
            <i className="fa fa-angle-left" aria-hidden="true" />
          </div>
          <div className="title">Your Cart</div>
        </div>
        <div className="dialog__body">
          <div className="select">
            <CustomSelect
              placeholder="Currency"
              classNamePrefix="modal-select"
              options={options}
            />
          </div>
          <div className="cart-list">{cart.map((item) => item.title)}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
