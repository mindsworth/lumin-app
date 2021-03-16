import React, { createContext, useEffect, useState } from "react";
import { get, set } from "idb-keyval";

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

  const replaceCartsState = (data) => {
    set("cart", data)
      .then(() => getCart())
      .catch((err) => console.log("It failed!", err));
  };

  return (
    <CartsContext.Provider
      value={{ carts, refresh: getCart, setCarts: replaceCartsState }}
    >
      {children}
    </CartsContext.Provider>
  );
};

export default CartsContextProvider;
