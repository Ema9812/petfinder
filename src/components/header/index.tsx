import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/use-user";

export function Header() {
  const { user, logout } = useUser();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 16, background: "#5a8fec" }}>
      <Link to="/">Petfinder</Link>
      <nav style={{ display: "flex", gap: 16 }}>
        <Link to="/my-data">Mis datos</Link>
        <Link to="/report-pet">Reportar mascota</Link>
        {user ? <button onClick={logout}>Cerrar sesión</button> : <Link to="/login">Ingresar</Link>}
      </nav>
    </header>
  );
}