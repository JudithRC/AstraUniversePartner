import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ApiTest() {
  const [result, setResult] = useState<string>("Cargando...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/ping")
      .then(response => setResult(JSON.stringify(response.data)))
      .catch(err => setError("Error conectando con el backend: " + err.message));
  }, []);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return <div>Respuesta del backend: {result}</div>;
}