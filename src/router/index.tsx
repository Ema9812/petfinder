import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { LoginPasswordPage } from "../pages/login-password";
import { RegisterPage } from "../pages/register";
import { MyDataPage } from "../pages/my-data";
import { ReportPetPage } from "../pages/report-pet";

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
          <Route path="/report-pet" element={<ReportPetPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}