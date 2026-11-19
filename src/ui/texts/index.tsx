import React from "react";

export function Title({ children }: { children: React.ReactNode }) {
  return <h1 style={{ fontSize: 40, fontWeight: 700, margin: 0 }}>{children}</h1>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{children}</h2>;
}

export function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 18, margin: 0 }}>{children}</p>;
}