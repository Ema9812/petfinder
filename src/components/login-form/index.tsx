import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { Button } from "../../ui/button";
import { Small } from "../../ui/texts";
import { useUser } from "../../hooks/use-user";

export function LoginForm() {
  const { pendingEmail, setPendingEmail } = useUser();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    setPendingEmail(email);
    navigate("/login/password");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TextField label="Email" name="email" type="email" defaultValue={pendingEmail} required />
      <Button type="submit">Siguiente</Button>
      <Small>
        ¿Aún no tenés cuenta?{" "}
        <Link to="/register" style={{ color: "#5a8fec" }}>
          Registrate
        </Link>
      </Small>
    </form>
  );
}