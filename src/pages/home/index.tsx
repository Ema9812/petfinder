import React from "react";
import { Title, Subtitle, Body } from "../../ui/texts";
import { Button } from "../../ui/button";
import { PetCard } from "../../components/pet-card";
import { useNearbyPets } from "../../hooks/use-nearby-pets";

export function HomePage() {
  const { pets, error, askLocation } = useNearbyPets();

  if (!pets) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
        <Title>Pet Finder App</Title>
        <Body>Encontrá y reportá mascotas perdidas cerca de tu ubicación.</Body>
        <Button onClick={askLocation}>Dar mi ubicación actual</Button>
        <Button color="green">¿Cómo funciona Pet Finder?</Button>
        {error && <Body>{error}</Body>}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Subtitle>Mascotas perdidas cerca</Subtitle>
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          name={pet.name}
          place={pet.place}
          imageUrl={pet.imageUrl}
          buttonLabel="Reportar"
          onButtonClick={() => console.log("Reportar info de", pet.name)}
        />
      ))}
    </div>
  );
}