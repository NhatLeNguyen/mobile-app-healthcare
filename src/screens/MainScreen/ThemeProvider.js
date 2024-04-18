import { createContext, useMemo, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ chidren }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const contextValue = useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode,
    }),
    [isDarkMode]
  );
  return (
    <ThemeContext.Provider value={contextValue}>
      {chidren}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
