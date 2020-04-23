import { writable } from "svelte/store";
declare const io: any;

export const data = writable([]);

console.log("Fetching data...");
fetch("https://camundacon-live.joshwulf.com/data").then((res) => {
  res.json().then((deets) => {
    data.set(deets);
    console.log(deets);
  });
});

const socket = io("https://camundacon-live.joshwulf.com/");

socket.on("emit", (deets: any) => {
  data.set(deets);
});
