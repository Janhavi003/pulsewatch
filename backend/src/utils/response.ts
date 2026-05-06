import { Response } from "express";
import { ApiResponse } from "@/types";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200
): void {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  error: string,
  statusCode = 500,
  details?: unknown
): void {
  const response: ApiResponse = {
    success: false,
    error,
    timestamp: new Date().toISOString(),
  };

  // Safe mutation without invalid cast
  if (details && process.env["NODE_ENV"] === "development") {
    Object.assign(response, { details });
  }

  res.status(statusCode).json(response);
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number
): void {
  const response: ApiResponse<T[]> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    meta: {
      total,
      page,
      limit,
    },
  };

  res.status(200).json(response);
}