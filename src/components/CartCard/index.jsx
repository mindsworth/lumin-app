import React from "react";
import { update } from "idb-keyval";
import "./CartCardStyling.scss";

function CartCard({ data }) {
  const handleOnAddToCart = (data) => {
    update("cart", (res) => {
      const newItem = { ...data, count: 1 };
      const currentItem = res.find((item) => item.id === data.id);

      if (res) {
        return currentItem
          ? res.map((item) => {
              if (item.id === data.id) {
                item.count++;
                return item;
              }

              return item;
            })
          : [...res, newItem];
      } else {
        return [newItem];
      }
    });
  };

  return (
    <div className="cart-card">
      <div className="title">{data.title}</div>
      <div className="image-wrapper">
        <figure
          className="image"
          style={{ backgroundImage: `url(${data.image_url})` }}
        />
      </div>

      <div className="counter-wrapper">
        <div className="counter">
          <button className="btn" onClick={() => handleOnAddToCart(data)}>
            <i class="fa fa-minus" aria-hidden="true" />
          </button>
          <span className="num">{data.count}</span>
          <button className="btn" onClick={() => handleOnAddToCart(data)}>
            <i class="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
        <div className="price">${data.price}</div>
      </div>
    </div>
  );
}

export default CartCard;
