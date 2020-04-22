const io = require("socket.io")(3000);

function emit(data) {
  io.emit("response", data);
}
