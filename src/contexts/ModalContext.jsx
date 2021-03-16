import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const setVisibility = async () => setVisible((provState) => !provState);

  return (
    <ModalContext.Provider value={{ visible, setVisibility }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
