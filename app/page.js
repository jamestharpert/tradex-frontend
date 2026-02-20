"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modules, setModules] = useState([]);

  // Cargar módulos al iniciar
  useEffect(() => {
    const loadModules = async () => {
      const { data, error } = await supabase
        .from("modules")
        .select("*")
        .order("order", { ascending: true });

      if (!error && data) {
        setModules(data);
      }
    };

    loadModules();
  }, []);

  // Registro de usuario + creación de perfil
  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (user) {
      await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          xp: 0,
          level: 1,
        },
      ]);
    }

    alert("Cuenta creada y perfil inicializado");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0a0f1c",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "42px" }}>TradeX Academy</h1>
      <p>Aprende trading de forma profesional.</p>

      {/* REGISTRO */}
      <div style={{ marginTop: "40px" }}>
        <h2>Crear cuenta</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
          }}
        />

        <button
          onClick={signUp}
          style={{
            padding: "10px 20px",
            background: "#1e90ff",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          Crear cuenta
        </button>
      </div>

      {/* MÓDULOS */}
      <div style={{ marginTop: "60px" }}>
        <h2>Módulos disponibles</h2>

        {modules.length === 0 && <p>No hay módulos aún.</p>}

        {modules.map((module) => (
          <div
            key={module.id}
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#111827",
              borderRadius: "10px",
            }}
          >
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
