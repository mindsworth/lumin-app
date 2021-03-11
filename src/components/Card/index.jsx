import React from "react";
import { update } from "idb-keyval";
import "./CardStyling.scss";

function Card({ data }) {
  const handleOnAddToCart = (data) => {
    update("cart", (res) => {
      let newItem;

      console.log("res :", res);

      if (res) {
        return (newItem = res.map((item) => {
          if (item.id === data.id) {
            item.count++;
            return item;
          }

          return item;
        }));
      } else {
        newItem = { ...data, count: 1 };

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
