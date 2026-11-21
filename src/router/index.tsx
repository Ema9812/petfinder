import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { LoginPasswordPage } from "../pages/login-password";
import { RegisterPage } from "../pages/register";
import { MyDataPage } from "../pages/my-data";
import { MyDataEditPage } from "../pages/my-data-edit";
import { MyDataPasswordPage } from "../pages/my-data-password";
import { MyPetsPage } from "../pages/my-pets";
import { ReportPetPage } from "../pages/report-pet";
import { EditPetPage } from "../pages/edit-pet";

export function AppRouter() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/password" element={<LoginPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-data" element={<MyDataPage />} />
          <Route path="/my-data/edit" element={<MyDataEditPage />} />
          <Route path="/my-data/password" element={<MyDataPasswordPage />} />
          <Route path="/my-pets" element={<MyPetsPage />} />
          <Route path="/report-pet" element={<ReportPetPage />} />
          <Route path="/edit-pet/:id" element={<EditPetPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}