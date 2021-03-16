import React from "react";
import { update } from "idb-keyval";
import "./CartCardStyling.scss";

function CartCard({ data, refresh }) {
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

    refresh();
  };

  const handleOnDecrement = (data) => {
    update("cart", (res) => {
      return res.map((item) => {
        if (item.id === data.id && item.count > 1) {
          item.count--;
          return item;
        } else if (item.id === data.id && item.count === 1) {
          handleOnRemove(data);
        }

        return item;
      });
    });

    refresh();
  };

  const handleOnRemove = (data) => {
    update("cart", (res) => {
      return res.filter((item) => item.id !== data.id);
    });

    refresh();
  };

  return (
    <div className="cart-card">
      <i
        className="fa fa-times close"
        onClick={() => handleOnRemove(data)}
        aria-hidden="true"
      />
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
            <i className="fa fa-minus" aria-hidden="true" />
          </button>
          <span className="num">{data.count}</span>
          <button className="btn" onClick={() => handleOnIncrement(data)}>
            <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
        <div className="price">${data.price}</div>
      </div>
    </div>
  );
}

export default CartCard;
