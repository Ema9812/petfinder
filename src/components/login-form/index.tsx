import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { useUser } from "../../hooks/use-user";

export function LoginForm() {
  const { login } = useUser();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    await login(email, password);
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TextField label="Email" name="email" type="email" />
      <TextField label="Contraseña" name="password" type="password" />
      <Button type="submit">Ingresar</Button>
    </form>
  );
}