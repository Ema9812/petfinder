import React, { useState } from "react";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { Pet } from "../../hooks/use-nearby-pets";
import { useReportPetInfo } from "../../hooks/use-report-pet-info";
import css from "./index.module.css";

type ReportModalProps = {
  pet: Pet | null;
  onClose: () => void;
};

export function ReportModal({ pet, onClose }: ReportModalProps) {
  const { sendReport } = useReportPetInfo();
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  if (!pet) return null;

  const petId = pet.id;

  function handleClose() {
    setStatus("idle");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value;

    try {
      await sendReport(petId, {
        name: get("name"),
        phone: get("phone"),
        where: get("where"),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={css.overlay}>
      <div className={css.box}>
        <button className={css.close} onClick={handleClose} aria-label="Cerrar">
          ✕
        </button>
        <h2 className={css.title}>Reportar info de {pet.name}</h2>

        {status === "sent" ? (
          <div className={css.form}>
            <p className={css.message}>¡Gracias! Enviamos tu información.</p>
            <Button onClick={handleClose}>Cerrar</Button>
          </div>
        ) : (
          <form className={css.form} onSubmit={handleSubmit}>
            <TextField label="Nombre" name="name" required />
            <TextField label="Teléfono" name="phone" type="tel" required />
            <TextField label="¿Dónde lo viste?" name="where" multiline required />
            {status === "error" && (
              <p className={css.message}>No pudimos enviar la información. Probá de nuevo.</p>
            )}
            <Button type="submit" color="green">
              Enviar información
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}