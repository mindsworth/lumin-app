import React from "react";
import { update } from "idb-keyval";
import "./CardStyling.scss";

function Card({ data }) {
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
    <div className="card">
      <figure
        className="image"
        style={{ backgroundImage: `url(${data.image_url})` }}
      />
      <figcaption className="caption">
        <div className="title">{data.title}</div>
        <div className="price">From ${data.price}</div>
      </figcaption>
      <button className="btn" onClick={() => handleOnAddToCart(data)}>
        Add to cart
      </button>
    </div>
  );
}

export default Card;
