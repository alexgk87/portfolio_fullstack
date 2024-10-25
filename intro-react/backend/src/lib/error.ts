import type { HonoEnv } from "../app";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";
import { z, type ZodError } from "zod";

// Definerer en enum for ulike typer feil ved hjelp av Zod
const Errors = z.enum([
  "BAD_REQUEST",
  "FORBIDDEN",
  "INTERNAL_SERVER_ERROR",
  "NOT_FOUND",
  "NOT_UNIQUE",
  "RATE_LIMITED",
  "UNAUTHORIZED",
  "METHOD_NOT_ALLOWED",
]);

// Inferred type basert på den definerte enum
export type ErrorCode = z.infer<typeof Errors>;

// Funksjon som mapper feiltyper til HTTP-statuskoder
function codeToStatus(code: ErrorCode): StatusCode {
  switch (code) {
    case "BAD_REQUEST":
      return 400;
    case "FORBIDDEN":
    case "UNAUTHORIZED":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "METHOD_NOT_ALLOWED":
      return 405;
    case "NOT_UNIQUE":
      return 409;
    case "RATE_LIMITED":
      return 429;
    case "INTERNAL_SERVER_ERROR":
      return 500;
  }
}

// Funksjon som mapper HTTP-statuskoder til feiltyper
function statusToCode(status: StatusCode): ErrorCode {
  switch (status) {
    case 400:
      return "BAD_REQUEST";
    case 401:
      return "UNAUTHORIZED";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "NOT_FOUND";
    case 405:
      return "METHOD_NOT_ALLOWED";
    case 500:
      return "INTERNAL_SERVER_ERROR";
    default:
      return "INTERNAL_SERVER_ERROR";
  }
}

// Klasse for API-feil som arver fra HTTPException
// Gir oss bedre kontroll / mulighet til å styre hva som skal med i feilen
export class ApiError extends HTTPException {
  public readonly code: ErrorCode;

  constructor({ code, message }: { code: ErrorCode; message: string }) {
    super(codeToStatus(code), { message });
    this.code = code;
  }
}

// Funksjon som parser feilmeldinger fra ZodError
export function parseZodErrorMessage(err: z.ZodError): string {
  try {
    const arr = JSON.parse(err.message) as Array<{
      message: string;
      path: Array<string>;
    }>;
    const { path, message } = arr[0];
    return `${path.join(".")}: ${message}`;
  } catch {
    return err.message;
  }
}

// Funksjon som håndterer Zod-feil og returnerer en passende HTTP-respons
export function handleZodError(
  result:
    | {
        success: true;
        data: unknown;
      }
    | {
        success: false;
        error: ZodError;
      },
  c: Context
) {
  if (!result.success) {
    return c.json(
      {
        error: {
          code: "BAD_REQUEST",
          message: parseZodErrorMessage(result.error),
        },
      },
      { status: 400 }
    );
  }
}

// Funksjon som håndterer generelle feil og logger dem, og returnerer en passende HTTP-respons
export const handleError = async (err: Error, c: Context<HonoEnv>) => {
  const { logger } = c.get("services");

  if (err instanceof ApiError) {
    if (err.status >= 500) {
      logger.error({
        [err.message]: {
          name: err.name,
          code: err.code,
          status: err.status,
        },
      });
    }
    return c.json(
      {
        error: {
          code: err.code,
          message: err.message,
        },
      },
      { status: err.status }
    );
  }

  if (err instanceof HTTPException) {
    if (err.status >= 500) {
      logger.error({
        HTTPException: {
          message: err.message,
          status: err.status,
        },
      });
    }

    const code = statusToCode(err.status);

    return c.json(
      {
        error: {
          code,
          message: err.message,
        },
      },
      { status: err.status }
    );
  }

  logger.error({
    "unhandled exception": {
      name: err.name,
      message: err.message,
      cause: err.cause,
      stack: err.stack,
    },
  });

  return c.json(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: err.message ?? "Something went wrong",
      },
    },
    { status: 500 }
  );
};

// Funksjon som returnerer en feilmelding i en HTTP-respons
export function errorResponse(c: Context, code: ErrorCode, message: string) {
  return c.json(
    {
      error: {
        code,
        message,
      },
    },
    { status: codeToStatus(code) }
  );
}