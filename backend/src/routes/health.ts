import { Router, Request, Response } from "express";
import { env } from "@/config/env";
import { APP_NAME } from "@/config/constants";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status:    "ok",
    app:       APP_NAME,
    version:   "1.0.0",
    env:       env.NODE_ENV,
    uptime:    Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    services: {
      prometheus:   env.PROMETHEUS_URL,
      loki:         env.LOKI_URL,
      alertmanager: env.ALERTMANAGER_URL,
    },
  });
});

router.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({ pong: true, timestamp: new Date().toISOString() });
});

export default router;