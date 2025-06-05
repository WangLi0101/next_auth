"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
interface Props {
  children: React.ReactNode;
}
export const Aos = ({ children }: Props) => {
  useEffect(() => {
    AOS.init({
      duration: 600, // 适中的动画时长
      offset: 80, // 减小偏移量
      delay: 0,
      easing: "ease-out", // 使用更流畅的缓动函数
      throttleDelay: 99, // 节流延迟
      disableMutationObserver: false, // 禁用突变观察器以提高性能
    });
  }, []);
  return <div>{children}</div>;
};
