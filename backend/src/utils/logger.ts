import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { env } from "@/config/env";

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

// Console format for development
const devFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack ?? message}`;
});

// File transport with daily rotation
const fileTransport = new DailyRotateFile({
  filename:     "logs/pulsewatch-%DATE%.log",
  datePattern:  "YYYY-MM-DD",
  zippedArchive: true,
  maxSize:      "20m",
  maxFiles:     "14d",
  format: combine(timestamp(), errors({ stack: true }), json()),
});

const errorFileTransport = new DailyRotateFile({
  filename:     "logs/pulsewatch-error-%DATE%.log",
  datePattern:  "YYYY-MM-DD",
  level:        "error",
  zippedArchive: true,
  maxSize:      "20m",
  maxFiles:     "30d",
  format: combine(timestamp(), errors({ stack: true }), json()),
});

export const logger = winston.createLogger({
  level: env.isDev ? "debug" : "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true })),
  transports: [
    // Console — always on
    new winston.transports.Console({
      format: env.isDev
        ? combine(colorize(), devFormat)
        : combine(timestamp(), json()),
    }),
    // File transports — production
    ...(env.isProd ? [fileTransport, errorFileTransport] : []),
  ],
  exitOnError: false,
});

// Stream for Morgan HTTP logging
export const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};