import { useRef, useCallback } from "react";

// Async version
export function useOnceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  immediate: boolean = true,
): T | void {
  const hasRun = useRef(false);
  const fnRef = useRef(fn);

  fnRef.current = fn;

  const execute = useCallback(async (...args: Parameters<T>) => {
    if (hasRun.current) return;
    hasRun.current = true;
    return await fnRef.current(...args);
  }, []) as T;

  if (immediate) {
    execute();
    return;
  }

  return execute;
}
