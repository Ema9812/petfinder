import React from "react";
import { Title, Body } from "../../ui/texts";
import { RegisterForm } from "../../components/register-form";

export function RegisterPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      <Title>Registrarse</Title>
      <Body>Ingresá los siguientes datos para realizar el registro</Body>
      <RegisterForm />
    </div>
  );
}