import React, { useRef } from "react";
import { Button } from "../button";
import css from "./index.module.css";

type PhotoPickerProps = {
  value: string;
  onChange: (dataUrl: string) => void;
  changeLabel?: string;
};

function resizeImage(file: File, maxSize = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function PhotoPicker({ value, onChange, changeLabel = "Cambiar foto" }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      onChange(await resizeImage(file));
    } catch {
      // si la imagen no se puede leer, no cambiamos nada
    }
  }

  return (
    <div className={css.root}>
      <div className={css.preview}>
        {value ? <img className={css.image} src={value} alt="Foto de la mascota" /> : <span>Sin foto</span>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} hidden />
      <Button onClick={() => inputRef.current?.click()}>{value ? changeLabel : "Agregar foto"}</Button>
    </div>
  );
}