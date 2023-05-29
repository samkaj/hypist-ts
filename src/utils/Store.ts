import { writable, type Writable } from "svelte/store";
import type { User } from "../models";

const IS_CSR: boolean = localStorage !== undefined && document !== undefined;

/**
 * Like a regular svelte store, but it saves to localStorage when CSR.
 */
function localStorageStore<T>(key: string): Writable<T> {
  const { subscribe, set, update } = writable<T>();

  if (IS_CSR) {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      set(JSON.parse(storedValue));
      typeof localStorage !== "undefined";
    }
  }

  function setAndPersist(value: T) {
    set(value);
    if (!IS_CSR) {
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

  if (IS_CSR) {
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
