import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { Small } from "../../ui/texts";
import { useProfile } from "../../hooks/use-profile";

export function ChangePasswordForm() {
  const { savePassword } = useProfile();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await savePassword(password);
      navigate("/my-data");
    } catch {
      setError("No pudimos cambiar la contraseña. Probá de nuevo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TextField label="Contraseña" name="password" type="password" required />
      <TextField label="Confirmar contraseña" name="confirm" type="password" required />
      {error && <Small>{error}</Small>}
      <Button type="submit">Guardar</Button>
    </form>
  );
}