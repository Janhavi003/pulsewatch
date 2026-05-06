import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import { env } from "@/config/env";
import { CORS_OPTIONS, RATE_LIMIT, API_PREFIX } from "@/config/constants";
import { requestLogger } from "@/middleware/requestLogger";
import { errorHandler, notFoundHandler } from "@/middleware/errorHandler";
import healthRouter from "@/routes/health";
import { logger } from "@/utils/logger";

export function createApp(): Application {
  const app = express();

  // ─── Security Middleware ───────────────────────────────────────────
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: false,
    })
  );

  // ─── CORS ─────────────────────────────────────────────────────────
  app.use(
    cors({
      ...CORS_OPTIONS,
      origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
      ) => {
        const allowed: string[] = [
          env.FRONTEND_URL,
          "http://localhost:3000",
        ];

        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin || allowed.includes(origin)) {
          callback(null, true);
        } else {
          logger.warn(`CORS blocked origin: ${origin}`);
          callback(new Error(`CORS policy: origin ${origin} not allowed`));
        }
      },

      // IMPORTANT: mutable arrays (not readonly)
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
      ],
    })
  );

  // ─── Body Parsing ──────────────────────────────────────────────────
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cookieParser());

  // ─── Compression ───────────────────────────────────────────────────
  app.use(compression());

  // ─── Rate Limiting ─────────────────────────────────────────────────
  app.use(
    API_PREFIX,
    rateLimit({
      windowMs: RATE_LIMIT.windowMs,
      max: RATE_LIMIT.max,
      message: { success: false, error: RATE_LIMIT.message },
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // ─── HTTP Logging ──────────────────────────────────────────────────
  app.use(requestLogger);

  // ─── Trust Proxy (for Nginx/Docker deployments) ────────────────────
  app.set("trust proxy", 1);

  // ─── Routes ────────────────────────────────────────────────────────
  app.use(API_PREFIX, healthRouter);

  // TODO: More routes added in Phase 4
  // app.use(`${API_PREFIX}/auth`,    authRouter);
  // app.use(`${API_PREFIX}/metrics`, metricsRouter);
  // app.use(`${API_PREFIX}/logs`,    logsRouter);
  // app.use(`${API_PREFIX}/alerts`,  alertsRouter);

  // ─── 404 & Error Handlers ──────────────────────────────────────────
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}