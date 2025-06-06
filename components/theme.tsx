"use client";
import React, { createContext, useEffect, useState } from "react";
interface Props {
  children: React.ReactNode;
}
export const ThemeContext = createContext<{
  isDark: boolean;
  changeDark: () => void;
}>({
  isDark: false,
  changeDark: () => {},
});
export const ThemeProvider = ({ children }: Props) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 初始化时读取localStorage
    const dark = localStorage.getItem("isDark");
    setIsDark(dark === "true");
  }, []);

  useEffect(() => {
    if (!document.startViewTransition) {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
      return;
    }
    document.startViewTransition(() => {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
    });
  }, [isDark]);

  const changeDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("isDark", next.toString());
      return next;
    });
  };
  return (
    <ThemeContext.Provider value={{ isDark, changeDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
