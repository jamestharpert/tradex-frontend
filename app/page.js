"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modules, setModules] = useState([]);

  // 🔹 Registro + creación de perfil
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

  // 🔹 Cargar módulos desde Supabase
  useEffect(() => {
    const loadModules = async () => {
      const { data, error } = await supabase
        .from("modules")
        .select("*")
        .order("order", { ascending: true });

      if (!error) {
        setModules(data);
      }
    };

    loadModules();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0f1c",
        color: "white",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
        TradeX Academy
      </h1>
      <p style={{ opacity: 0.7 }}>
        Aprende trading de forma profesional y estructurada.
      </p>

      {/* 🔹 Registro */}
      <div
        style={{
          marginTop: "50px",
          padding: "30px",
          background: "#111827",
          borderRadius: "12px",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Crear Cuenta</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <button
          onClick={signUp}
          style={{
            width: "100%",
            padding: "10px",
            background: "#1e90ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Crear cuenta
        </button>
      </div>

      {/* 🔹 Módulos */}
      <div style={{ marginTop: "80px" }}>
        <h2>Módulos disponibles</h2>

        {modules.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No hay módulos aún.</p>
        ) : (
          modules.map((module) => (
            <div
              key={module.id}
              style={{
                marginTop: "20px",
                padding: "25px",
                background: "#111827",
                borderRadius: "12px",
                transition: "0.3s",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{module.title}</h3>
              <p style={{ opacity: 0.7 }}>{module.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
