import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "../menu";
import css from "./index.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={css.root}>
        <Link to="/" className={css.logo}>
          🐾
        </Link>
        <button className={css.burger} onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
          ☰
        </button>
      </header>
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}