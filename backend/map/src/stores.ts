import { writable } from "svelte/store";
declare const io: any;

export const data = writable([]);

const socket = io("http://localhost:5000");

socket.on("emit", (data: any) => {
  console.log(DataTransfer);
});
