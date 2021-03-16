import React, { createContext, useEffect, useState } from "react";
import { get, set } from "idb-keyval";

export const CartsContext = createContext();

const CartsContextProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [selectCurrency, setSelectCurrency] = useState();
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const currencyRes = await get("currency");
    const cartsRes = await get("carts");
    setCarts(cartsRes || []);
    setSelectCurrency(
      currencyRes || {
        label: "USD",
        value: "USD",
      }
    );
  };

  const replaceCartsState = (data) => {
    set("carts", data)
      .then(() => getCart())
      .catch((err) => console.log("It failed!", err));
  };

  const setCurrencyState = (data) => {
    set("currency", data).catch((err) => console.log("It failed!", err));
  };

  return (
    <CartsContext.Provider
      value={{
        carts,
        refresh: getCart,
        setCarts: replaceCartsState,
        selectCurrency,
        setSelectCurrency: setCurrencyState
      }}
    >
      {children}
    </CartsContext.Provider>
  );
};

export default CartsContextProvider;
