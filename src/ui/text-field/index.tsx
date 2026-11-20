import React from "react";
import css from "./text-field.module.css";

type TextFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  multiline?: boolean;
};

export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  required,
  multiline,
}: TextFieldProps) {
  return (
    <label className={css.root}>
      <span className={css.label}>{label}</span>
      {multiline ? (
        <textarea
          className={css.input}
          name={name}
          rows={4}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
        />
      ) : (
        <input
          className={css.input}
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
        />
      )}
    </label>
  );
}