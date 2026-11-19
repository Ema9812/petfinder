import React from "react";
import css from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  color?: "primary" | "secondary";
};

export function Button({ children, onClick, type = "button", color = "primary" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`${css.root} ${css[color]}`}>
      {children}
    </button>
  );
}
