import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { Small } from "../../ui/texts";
import { useProfile } from "../../hooks/use-profile";

export function ProfileForm() {
  const { profile, saveProfile } = useProfile();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const locality = (form.elements.namedItem("locality") as HTMLInputElement).value;

    try {
      await saveProfile({ name, locality });
      navigate("/my-data");
    } catch {
      setError("No pudimos guardar tus datos. Probá de nuevo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TextField label="Nombre" name="name" defaultValue={profile.name} required />
      <TextField label="Localidad" name="locality" defaultValue={profile.locality} required />
      {error && <Small>{error}</Small>}
      <Button type="submit">Guardar</Button>
    </form>
  );
}