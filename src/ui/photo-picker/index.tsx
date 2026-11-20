import React, { useRef } from "react";
import { Button } from "../button";
import css from "./index.module.css";

type PhotoPickerProps = {
  value: string;
  onChange: (dataUrl: string) => void;
};

export function PhotoPicker({ value, onChange }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className={css.root}>
      <div className={css.preview}>
        {value ? <img className={css.image} src={value} alt="Foto de la mascota" /> : <span>Sin foto</span>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} hidden />
      <Button onClick={() => inputRef.current?.click()}>{value ? "Cambiar foto" : "Agregar foto"}</Button>
    </div>
  );
}