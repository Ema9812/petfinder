import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Title, Body } from "../../ui/texts";
import { EditPetForm } from "../../components/edit-pet-form";
import { useUser } from "../../hooks/use-user";
import { usePet } from "../../hooks/use-pet";

export function EditPetPage() {
  const { user } = useUser();
  const { id } = useParams();
  const { pet } = usePet(id);

  if (!user) return <Navigate to="/login" />;
  if (pet === undefined) return <Body>Cargando...</Body>;
  if (pet === null) return <Body>No encontramos esta mascota.</Body>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      <Title>Editar reporte de mascota</Title>
      <EditPetForm pet={pet} />
    </div>
  );
}