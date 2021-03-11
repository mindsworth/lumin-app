import React from "react";
import { update } from "idb-keyval";
import "./CartCardStyling.scss";

function CartCard({ data }) {
  const handleOnIncrement = (data) => {
    update("cart", (res) => {
      return res.map((item) => {
        if (item.id === data.id) {
          item.count++;
          return item;
        }

        return item;
      });
    });
  };

  const handleOnDecrement = (data) => {
    update("cart", (res) => {
      return res.map((item) => {
        if (item.id === data.id) {
          item.count--;
          return item;
        }

        return item;
      });
    });
  };

  return (
    <div className="cart-card">
      <i class="fa fa-times close" aria-hidden="true" />
      <div className="title">{data.title}</div>
      <div className="image-wrapper">
        <figure
          className="image"
          style={{ backgroundImage: `url(${data.image_url})` }}
        />
      </div>

      <div className="counter-wrapper">
        <div className="counter">
          <button className="btn" onClick={() => handleOnDecrement(data)}>
            <i class="fa fa-minus" aria-hidden="true" />
          </button>
          <span className="num">{data.count}</span>
          <button className="btn" onClick={() => handleOnIncrement(data)}>
            <i class="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
        <div className="price">${data.price}</div>
      </div>
    </div>
  );
}

export default CartCard;
