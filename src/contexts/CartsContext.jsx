import React, { createContext, useEffect, useState } from "react";
import { get } from "idb-keyval";

export const CartsContext = createContext();

const CartsContextProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const res = await get("cart");
    setCarts(res);
  };

  return (
    <CartsContext.Provider value={{ carts, refresh: getCart }}>
      {children}
    </CartsContext.Provider>
  );
};

export default CartsContextProvider;
