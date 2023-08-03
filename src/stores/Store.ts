import { writable, type Writable } from "svelte/store";
import { Gamemode, type Settings, type User } from "../models";

const isBrowser = typeof Storage !== "undefined";

/**
 * Like a regular svelte store, but it saves to localStorage when CSR.
 */
function localStorageStore<T>(
  key: string,
  defaultValue: T | undefined = undefined
): Writable<T> {
  const { subscribe, set, update } = writable<T>(defaultValue);
  if (isBrowser) {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      set(JSON.parse(storedValue));
      typeof localStorage !== "undefined";
    }
  }

  function setAndPersist(value: T) {
    set(value);
    if (!isBrowser) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  return {
    subscribe,
    set: (value) => setAndPersist(value),
    update,
  };
}

/**
 * Like a regular svelte store, but it saves the value to a cookie as well.
 */
function cookieStore(name: string): Writable<string> {
  const { subscribe, set, update } = writable<string>();

  if (isBrowser) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
    if (cookieValue !== undefined) {
      set(cookieValue.split("=")[1]);
    }
  }

  function buildCookie(value: string): string {
    return `${name}=${value}; Path=/; Secure; SameSite=Lax`;
  }

  function setAndSaveCookie(value: string) {
    if (typeof document === "undefined") {
      return;
    }
    const cookie = buildCookie(value);
    set(cookie);
    document.cookie = cookie;
  }

  return {
    subscribe,
    set: (value) => setAndSaveCookie(value),
    update,
  };
}

export const userStore = localStorageStore<User>("user");
export const tokenStore = cookieStore("token");
export const settingsStore = localStorageStore<Settings>("settings", {
  wordCount: 50,
  duration: 30,
  gamemode: Gamemode.Words,
});
