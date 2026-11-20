import React from "react";
import { Navigate } from "react-router-dom";
import { Title, Body } from "../../ui/texts";
import { ReportPetForm } from "../../components/report-pet-form";
import { useUser } from "../../hooks/use-user";

export function ReportPetPage() {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      <Title>Reportar mascota</Title>
      <Body>Ingresá la siguiente información para realizar el reporte de la mascota</Body>
      <ReportPetForm />
    </div>
  );
}