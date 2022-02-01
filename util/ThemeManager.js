import React, { useState } from "react";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [lightMode, setLightMode] = useState(true);
  const [isTyping, setIsTyping] = useState(1);
  const [hp, setHp] = useState(3);

  const [fontsize, setFontsize] = useState(18);
  const [textLineHeight, setTextLineHeight] = useState(34);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    setLightMode(!lightMode);
  };

  const toggleTyping = () => {
    isTyping === 1 ? setIsTyping(0) : setIsTyping(1);
  };

  const handleHp = (amount) => {
    setHp(hp + amount);
  };

  const handleFontsize = (amount) => {
    setFontsize(amount);
  };

  const handleTextLineHeight = (amount) => {
    setTextLineHeight(amount);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        lightMode,
        toggleTheme,
        isTyping,
        toggleTyping,
        hp,
        handleHp,
        fontsize,
        handleFontsize,
        textLineHeight,
        handleTextLineHeight,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
