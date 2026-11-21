import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Title, Small } from "../../ui/texts";
import { Button } from "../../ui/button";
import { useUser } from "../../hooks/use-user";

export function MyDataPage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" />;

  function handleLogout() {
    navigate("/");
    logout();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
      <Title>Mis datos</Title>
      <Button onClick={() => navigate("/my-data/edit")}>Modificar datos personales</Button>
      <Button onClick={() => navigate("/my-data/password")}>Modificar contraseña</Button>
      <Small>{user.email}</Small>
      <button
        onClick={handleLogout}
        style={{
          background: "none",
          border: "none",
          color: "#5a8fec",
          fontSize: 14,
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}