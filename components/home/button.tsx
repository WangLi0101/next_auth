import React from "react";
import "./button.css";
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}
export const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return <button className={`my_button ${className}`}>{children}</button>;
};
