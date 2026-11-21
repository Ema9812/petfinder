import React from "react";
import { Navigate } from "react-router-dom";
import { Title } from "../../ui/texts";
import { ProfileForm } from "../../components/profile-form";
import { useUser } from "../../hooks/use-user";

export function MyDataEditPage() {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      <Title>Datos personales</Title>
      <ProfileForm />
    </div>
  );
}