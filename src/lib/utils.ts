import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildQuery(
  params: Record<string, string | number | string[] | undefined>,
): string {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (value === undefined) continue;
    searchParams.set(
      key,
      Array.isArray(value) ? value.join(",") : String(value),
    );
  }
  return searchParams.toString();
}

export function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number,
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}

export function firstWord(str: string) {
  return str.split(" ").at(0);
}
