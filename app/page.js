"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Cuenta creada correctamente");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "42px" }}>TradeX Academy</h1>

      <div style={{ marginTop: "40px" }}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "10px" }}
        />

        <button
          onClick={signUp}
          style={{
            padding: "10px 20px",
            background: "#1e90ff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
}
