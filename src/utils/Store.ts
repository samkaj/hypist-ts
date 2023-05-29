import { writable, type Writable } from "svelte/store";
import type { User } from "../models";

/**
 * Like a regular svelte store, but it saves to localStorage when CSR.
 */
function localStorageStore<T>(key: string): Writable<T> {
  const { subscribe, set, update } = writable<T>();

  function setAndPersist(value: T) {
    set(value);
    if (typeof window.localStorage === "undefined") {
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
