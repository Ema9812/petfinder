import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Subtitle, Body } from "../../ui/texts";
import { Button } from "../../ui/button";
import { PetCard } from "../../components/pet-card";
import { useUser } from "../../hooks/use-user";
import { useMyPets } from "../../hooks/use-my-pets";

export function MyPetsPage() {
  const { user } = useUser();
  const { pets } = useMyPets();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" />;
  if (!pets) return <Body>Cargando...</Body>;

  if (pets.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
        <Subtitle>Mascotas reportadas</Subtitle>
        <Body>Aún no reportaste mascotas perdidas</Body>
        <Button onClick={() => navigate("/report-pet")}>Publicar reporte</Button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Subtitle>Mascotas reportadas</Subtitle>
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          name={pet.name}
          place={pet.place}
          imageUrl={pet.imageUrl}
          buttonLabel="Editar"
          buttonColor="blue"
          onButtonClick={() => navigate(`/edit-pet/${pet.id}`)}
        />
      ))}
    </div>
  );
}