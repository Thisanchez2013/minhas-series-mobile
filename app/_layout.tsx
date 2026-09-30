import "../global.css";

import { Stack } from "expo-router";
import { useEffect } from "react";

import { runMigrations } from "../src/database/database";

export default function RootLayout() {
  useEffect(() => {
    runMigrations().catch((error) => {
      console.error("Erro ao inicializar o banco de dados:", error);
    });
  }, []);

  return <Stack />;
}