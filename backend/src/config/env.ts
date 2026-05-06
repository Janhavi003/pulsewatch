import dotenv from "dotenv";
import path from "path";

// Load .env from monorepo root
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const env = {
  // App
  NODE_ENV:    optionalEnv("NODE_ENV", "development"),
  PORT:        parseInt(optionalEnv("BACKEND_PORT", "4000"), 10),
  APP_NAME:    optionalEnv("APP_NAME", "PulseWatch"),
  FRONTEND_URL: optionalEnv("APP_URL", "http://localhost:3000"),

  // Supabase
  SUPABASE_URL:              optionalEnv("NEXT_PUBLIC_SUPABASE_URL", ""),
  SUPABASE_SERVICE_ROLE_KEY: optionalEnv("SUPABASE_SERVICE_ROLE_KEY", ""),
  SUPABASE_ANON_KEY:         optionalEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", ""),

  // Prometheus
  PROMETHEUS_URL: optionalEnv("PROMETHEUS_URL", "http://localhost:9090"),

  // Loki
  LOKI_URL: optionalEnv("LOKI_URL", "http://localhost:3100"),

  // Alertmanager
  ALERTMANAGER_URL: optionalEnv("ALERTMANAGER_URL", "http://localhost:9093"),

  // JWT
  JWT_SECRET: optionalEnv("JWT_SECRET", "pulsewatch-dev-secret-change-in-prod"),

  // Email
  SMTP_HOST: optionalEnv("SMTP_HOST", "smtp.gmail.com"),
  SMTP_PORT: parseInt(optionalEnv("SMTP_PORT", "587"), 10),
  SMTP_USER: optionalEnv("SMTP_USER", ""),
  SMTP_PASS: optionalEnv("SMTP_PASS", ""),

  // Helpers
  get isDev()  { return this.NODE_ENV === "development"; },
  get isProd() { return this.NODE_ENV === "production"; },
} as const;