import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Le CLI utilise la propriété 'url' pour se connecter.
    // Pour Supabase, nous passons ici le lien DIRECT_URL avec sslmode=no-verify pour le CLI (Rust).
    url:
      (env("DIRECT_URL") || "") +
      ((env("DIRECT_URL") || "").includes("?") ? "&" : "?") +
      "sslmode=no-verify",
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
