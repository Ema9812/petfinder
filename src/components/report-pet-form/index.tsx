import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { PhotoPicker } from "../../ui/photo-picker";
import { MapView } from "../../ui/map";
import { Small } from "../../ui/texts";
import { useCreatePet } from "../../hooks/use-create-pet";

export function ReportPetForm() {
  const { createPet, findPlace } = useCreatePet();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [photo, setPhoto] = useState("");
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState("");

  function getValue(name: string) {
    return (formRef.current!.elements.namedItem(name) as HTMLInputElement).value;
  }

  async function handleSearch() {
    const query = getValue("place").trim();
    if (!query) return;
    const found = await findPlace(query);
    if (found) {
      setMarker(found);
      setError("");
    } else {
      setError("No encontramos ese lugar. Probá con otra dirección o tocá el mapa.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!photo) return setError("Agregá una foto de la mascota.");
    if (!marker) return setError("Marcá en el mapa dónde se perdió.");

    try {
      await createPet({
        name: getValue("name"),
        imageUrl: photo,
        lat: marker.lat,
        lng: marker.lng,
        place: getValue("place"),
      });
      navigate("/my-pets");
    } catch {
      setError("No pudimos publicar el reporte. Probá de nuevo.");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <TextField label="Nombre" name="name" required />
      <PhotoPicker value={photo} onChange={setPhoto} />
      <MapView marker={marker} onPick={(lat, lng) => setMarker({ lat, lng })} />
      <Small>
        Buscá un punto de referencia para reportar a la mascota. Por ejemplo, la dirección de la
        plaza más cercana.
      </Small>
      <TextField label="Ubicación" name="place" required />
      <Button color="dark" onClick={handleSearch}>
        Buscar en el mapa
      </Button>
      {error && <Small>{error}</Small>}
      <Button type="submit" color="green">
        Reportar mascota
      </Button>
      <Button color="dark" onClick={() => navigate("/")}>
        Cancelar
      </Button>
    </form>
  );
}