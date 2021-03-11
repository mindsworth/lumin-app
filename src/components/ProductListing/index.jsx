import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Card from "../Card";
import Modal from "../Modal";
import "./ProductListingStyles.scss";
import { FETCH_PRODUCTS } from "../../graphQL/queries";

function ProductListing() {
  const { error, loading, data } = useQuery(FETCH_PRODUCTS);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  console.log("products :", products, error, loading);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <>
      <div className="products">
        <div className="container products__listing">
          {products.map((item) => (
            <Card key={item.id} data={item} handleShowModal={setShowModal} />
          ))}
        </div>
      </div>
      {showModal && <Modal handleShowModal={setShowModal} />}
    </>
  );
}

export default ProductListing;
