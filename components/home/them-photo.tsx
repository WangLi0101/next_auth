"use client";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../theme";

const ThemPhoto = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <Image
      src={isDark ? "/home/dark.svg" : "/home/light.svg"}
      alt="them-photo"
      width={100}
      height={100}
      className="w-full h-auto"
      priority
    />
  );
};

export default ThemPhoto;
