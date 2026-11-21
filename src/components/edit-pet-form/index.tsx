import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { PhotoPicker } from "../../ui/photo-picker";
import { MapView } from "../../ui/map";
import { Small } from "../../ui/texts";
import { PetDetail, usePetActions } from "../../hooks/use-pet";

export function EditPetForm({ pet }: { pet: PetDetail }) {
  const { updatePet, markPetFound, deletePet, findPlace } = usePetActions();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [photo, setPhoto] = useState(pet.imageUrl);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>({
    lat: pet.lat,
    lng: pet.lng,
  });
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

    if (!marker) return setError("Marcá en el mapa dónde se perdió.");

    try {
      await updatePet(pet.id, {
        name: getValue("name"),
        imageUrl: photo,
        lat: marker.lat,
        lng: marker.lng,
        place: getValue("place"),
      });
      navigate("/my-pets");
    } catch {
      setError("No pudimos guardar los cambios. Probá de nuevo.");
    }
  }

  async function handleFound() {
    try {
      await markPetFound(pet.id);
      navigate("/my-pets");
    } catch {
      setError("No pudimos marcar la mascota como encontrada. Probá de nuevo.");
    }
  }

  async function handleDelete() {
    if (!window.confirm("¿Seguro que querés eliminar este reporte?")) return;
    try {
      await deletePet(pet.id);
      navigate("/my-pets");
    } catch {
      setError("No pudimos eliminar el reporte. Probá de nuevo.");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <TextField label="Nombre" name="name" defaultValue={pet.name} required />
      <PhotoPicker value={photo} onChange={setPhoto} changeLabel="Modificar foto" />
      <MapView marker={marker} onPick={(lat, lng) => setMarker({ lat, lng })} />
      <Small>
        Buscá un punto de referencia para reportar a la mascota. Por ejemplo, la dirección de la
        plaza más cercana.
      </Small>
      <TextField label="Ubicación" name="place" defaultValue={pet.place} required />
      <Button color="dark" onClick={handleSearch}>
        Buscar en el mapa
      </Button>
      {error && <Small>{error}</Small>}
      <Button type="submit">Guardar</Button>
      <Button color="green" onClick={handleFound}>
        Reportar como encontrado
      </Button>
      <Button color="red" onClick={handleDelete}>
        Eliminar reporte
      </Button>
    </form>
  );
}