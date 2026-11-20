import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import css from "./index.module.css";

type MenuProps = {
  open: boolean;
  onClose: () => void;
};

export function Menu({ open, onClose }: MenuProps) {
  const { user, logout } = useUser();

  if (!open) return null;

  function handleLogout() {
    logout();
    onClose();
  }

  return (
    <nav className={css.root}>
      <button className={css.close} onClick={onClose} aria-label="Cerrar menú">
        ✕
      </button>

      <div className={css.links}>
        <Link to="/my-data" onClick={onClose}>Mis datos</Link>
        <Link to="/my-pets" onClick={onClose}>Mis mascotas reportadas</Link>
        <Link to="/report-pet" onClick={onClose}>Reportar mascota</Link>
      </div>

      <div className={css.footer}>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login" onClick={onClose}>Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
}