// @ts-nocheck
import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import RegisterPage from "./pages/RegisterPage";
import PersistLogin from "./components/PersistLogin";
import Unauthorized from "./components/Unathorized";
import RequireAuth from "./components/RequireAuth";
import Missing from "./pages/Missing";

function App() {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
