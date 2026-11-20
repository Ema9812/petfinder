import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { Small } from "../../ui/texts";
import { useUser } from "../../hooks/use-user";

export function PasswordForm() {
  const { pendingEmail, login } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("No pudimos iniciar sesión. Revisá el email y la contraseña.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TextField label="Email" name="email" type="email" defaultValue={pendingEmail} required />
      <TextField label="Contraseña" name="password" type="password" required />
      {error && <Small>{error}</Small>}
      <Button type="submit">Acceder</Button>
    </form>
  );
}