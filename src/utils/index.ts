export * from "./types";

type Success<T> = readonly [T, null];
type Failure<E> = readonly [null, E];
type ResultSync<T, E> = Success<T> | Failure<E>;
type ResultAsync<T, E> = Promise<ResultSync<T, E>>;
type Operation<T> = Promise<T> | (() => T) | (() => Promise<T>);
export function tryCatch<T, E = Error>(
  operation: Promise<T>,
): ResultAsync<T, E>;
export function tryCatch<T, E = Error>(
  operation: () => Promise<T>,
): ResultAsync<T, E>;
export function tryCatch<T, E = Error>(operation: () => T): ResultSync<T, E>;
export function tryCatch<T, E = Error>(
  operation: Operation<T>,
): ResultSync<T, E> | ResultAsync<T, E> {
  if (operation instanceof Promise) {
    return operation
      .then((data: T) => [data, null] as const)
      .catch((error: E) => [null, error as E] as const);
  }

  try {
    const result = operation();

    if (result instanceof Promise) {
      return result
        .then((data: T) => [data, null] as const)
        .catch((error: E) => [null, error as E] as const);
    }

    return [result, null] as const;
  } catch (error) {
    return [null, error as E] as const;
  }
}

/**
 * Gets a display name for a user with fallback to "Unnamed User"
 * @param displayName - The user's display name (can be null/undefined)
 * @returns A display name string, never null or empty
 */
export function getUserDisplayName(displayName?: string | null): string {
  return displayName?.trim() || "Unnamed User";
}

/**
 * Checks if an email address is from Apple's Private Relay service
 * @param email - The email address to check
 * @returns true if the email is from Apple Private Relay, false otherwise
 */
export function isApplePrivateRelayEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.toLowerCase().includes("privaterelay.appleid.com");
}

// Export the ItemParser for use in other parts of the app
export { ItemParser, type ParsedItem } from "./item-parser";
export { useOnceAsync } from "./once";
export { removeUndefined } from "./remove-undefined";
