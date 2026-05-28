import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem("darkMode");
      return stored ? JSON.parse(stored) : false;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("darkMode", JSON.stringify(dark));
    } catch (e) {}
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
