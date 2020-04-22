const io = require("socket.io")(3000);

export function emit(data) {
  io.emit("response", data);
}
