import React from "react";
import { Title, Body } from "../../ui/texts";
import { LoginForm } from "../../components/login-form";

export function LoginPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      <Title>Ingresar</Title>
      <Body>Ingresá tu email para continuar</Body>
      <LoginForm />
    </div>
  );
}