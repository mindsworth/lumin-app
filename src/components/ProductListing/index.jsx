import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Card from "../Card";
import Modal from "../Modal";
import "./ProductListingStyles.scss";
import { FETCH_PRODUCTS } from "../../graphQL/queries";
import CartsContextProvider from "../../contexts/CartsContext";

function ProductListing() {
  const { loading, data } = useQuery(FETCH_PRODUCTS, {
    variables: {
      currency: "USD",
    },
  });
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <>
      <div className="products">
        {loading && (
          <div className="loading-state">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <div className="container products__listing">
          {!loading &&
            products.map((item) => (
              <Card key={item.id} data={item} handleShowModal={setShowModal} />
            ))}
        </div>
      </div>
      {showModal && (
        <CartsContextProvider>
          <Modal handleShowModal={setShowModal} />
        </CartsContextProvider>
      )}
    </>
  );
}

export default ProductListing;
