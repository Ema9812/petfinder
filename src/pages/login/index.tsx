import React from "react";
import { Title } from "../../ui/texts";
import { LoginForm } from "../../components/login-form";

export function LoginPage() {
  return (
    <div>
      <Title>Ingresar</Title>
      <LoginForm />
    </div>
  );
}