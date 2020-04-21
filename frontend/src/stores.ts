import { writable } from "svelte/store";

export const count = writable(0);
export const likes = writable("");
export const message = writable("");
export const latitude = writable(8.82);
export const longitude = writable(37.41);
