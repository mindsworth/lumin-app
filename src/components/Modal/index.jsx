import React from "react";
import "./ModalStyles.scss";

function Modal() {
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
