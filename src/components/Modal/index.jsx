import React, { useEffect, useState } from "react";
import { get } from "idb-keyval";
import "./ModalStyles.scss";

function Modal() {
  const [cart, setCart] = useState();
  useEffect(() => {
    get("cart").then((val) => {
      console.log("val", val);
      setCart(val);
    });
  }, []);
  return (
    <div className="modal">
      <div className="dialog">
        <div className="dialog__header">
          <div className="back-btn">
            <i className="fa fa-angle-left" aria-hidden="true" />
          </div>
          <div className="title">Your Cart</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
