import React from "react";
import { Header } from "../header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ padding: 16 }}>{children}</main>
    </>
  );
}