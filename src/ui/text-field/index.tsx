import React from "react";
import css from "./text-field.module.css";

type TextFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

export function TextField({ label, name, type = "text", placeholder }: TextFieldProps) {
  return (
    <label className={css.root}>
      <span className={css.label}>{label}</span>
      <input className={css.input} name={name} type={type} placeholder={placeholder} />
    </label>
  );
}
