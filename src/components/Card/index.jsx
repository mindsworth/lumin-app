import React from "react";
import "./CardStyling.scss";

function Card({ data }) {
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
      <button className="btn">Add to cart</button>
    </div>
  );
}

export default Card;
