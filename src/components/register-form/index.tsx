import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { Small } from "../../ui/texts";
import { useUser } from "../../hooks/use-user";

export function RegisterForm() {
  const { register } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value;

    if (get("password") !== get("confirm")) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await register(get("name"), get("email"), get("location"), get("password"));
      navigate("/");
    } catch {
      setError("No pudimos crear la cuenta. Revisá los datos o probá con otro email.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TextField label="Nombre" name="name" required />
      <TextField label="Email" name="email" type="email" required />
      <TextField label="Localidad" name="location" required />
      <TextField label="Contraseña" name="password" type="password" required />
      <TextField label="Confirmar contraseña" name="confirm" type="password" required />
      {error && <Small>{error}</Small>}
      <Button type="submit">Siguiente</Button>
      <Small>
        ¿Ya tenés una cuenta?{" "}
        <Link to="/login" style={{ color: "#5a8fec" }}>
          Iniciar sesión
        </Link>
      </Small>
    </form>
  );
}