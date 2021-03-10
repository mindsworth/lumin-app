import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Card from "../Card";
import "./ProductListingStyles.scss";
import { FETCH_PRODUCTS } from "../../graphQL/queries";

function ProductListing() {
  const { error, loading, data } = useQuery(FETCH_PRODUCTS);
  const [products, setProducts] = useState([]);
  console.log("products :", products, error, loading);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <div className="products">
      <div className="container products__listing">
        {products.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
