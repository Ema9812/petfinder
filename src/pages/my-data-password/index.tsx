import React from "react";
import { Navigate } from "react-router-dom";
import { Title } from "../../ui/texts";
import { ChangePasswordForm } from "../../components/change-password-form";
import { useUser } from "../../hooks/use-user";

export function MyDataPasswordPage() {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      <Title>Contraseña</Title>
      <ChangePasswordForm />
    </div>
  );
}