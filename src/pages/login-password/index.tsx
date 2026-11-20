import React from "react";
import { Title, Body } from "../../ui/texts";
import { PasswordForm } from "../../components/password-form";

export function LoginPasswordPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      <Title>Iniciar sesión</Title>
      <Body>Ingresá los siguientes datos para iniciar sesión</Body>
      <PasswordForm />
    </div>
  );
}