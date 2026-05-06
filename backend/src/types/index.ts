import { Request, Response, NextFunction } from "express";

// Authenticated request with user payload
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

// Standard API response shape
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// Prometheus instant query result
export interface PrometheusResult {
  metric: Record<string, string>;
  value: [number, string];
}

export interface PrometheusRangeResult {
  metric: Record<string, string>;
  values: Array<[number, string]>;
}

export interface PrometheusQueryResponse {
  status: "success" | "error";
  data: {
    resultType: "vector" | "matrix" | "scalar" | "string";
    result: PrometheusResult[] | PrometheusRangeResult[];
  };
  error?: string;
}

// Loki log stream result
export interface LokiStream {
  stream: Record<string, string>;
  values: Array<[string, string]>;
}

export interface LokiQueryResponse {
  status: string;
  data: {
    resultType: string;
    result: LokiStream[];
  };
}

// Metric data point
export interface MetricPoint {
  timestamp: number;
  value: number;
}

// Async Express handler type
export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// Controller method type
export type ControllerMethod = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;