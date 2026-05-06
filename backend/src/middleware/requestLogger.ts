import morgan from "morgan";
import { env } from "@/config/env";
import { morganStream } from "@/utils/logger";

// Detailed format for development
const devFormat =
  ":method :url :status :response-time ms — :res[content-length] bytes";

// JSON-friendly format for production
const prodFormat = JSON.stringify({
  method:         ":method",
  url:            ":url",
  status:         ":status",
  responseTime:   ":response-time",
  contentLength:  ":res[content-length]",
  userAgent:      ":user-agent",
  ip:             ":remote-addr",
});

export const requestLogger = morgan(
  env.isDev ? devFormat : prodFormat,
  { stream: morganStream }
);