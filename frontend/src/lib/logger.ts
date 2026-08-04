type LogContext = Record<string, unknown> | unknown;

const isDevelopment = process.env.NODE_ENV !== "production";

export function logWarning(message: string, context?: LogContext) {
  if (!isDevelopment) return;

  if (context === undefined) {
    console.warn(message);
    return;
  }

  console.warn(message, context);
}

export function logError(message: string, context?: LogContext) {
  if (!isDevelopment) return;

  if (context === undefined) {
    console.error(message);
    return;
  }

  console.error(message, context);
}
