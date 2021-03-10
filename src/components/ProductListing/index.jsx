import React from "react";
import Card from "../Card";
import "./ProductListingStyles.scss";

function ProductListing() {
  return (
    <div className="products">
      <div className="container products__listing">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default ProductListing;
