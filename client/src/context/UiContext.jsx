import { createContext, useState } from "react";

export const UiContext = createContext();

const UiProvider = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <UiContext.Provider value={{ mobileNavOpen, setMobileNavOpen }}>
      {children}
    </UiContext.Provider>
  );
};

export default UiProvider;
