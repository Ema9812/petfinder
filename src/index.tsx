import "./styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { AppRouter } from "./router";

const root = createRoot(document.getElementById("root")!);
root.render(
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>
);