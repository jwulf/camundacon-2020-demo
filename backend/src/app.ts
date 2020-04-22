require("dotenv").config();
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { zbc } from "./zb";
import { getData } from "./db";
const http = require("http").createServer(express());

const io = require("socket.io")(http);

function emit(data) {
  io.emit("response", data);
}
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.options("*", cors());

const port = 3000;

console.log(process.cwd());
console.log("process.env", process.env);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (_, res) => {
  res.send("Hello CamundaCon Live!");
});

app.get("/data", (_, res) => {
  getData().then((rows) => res.json(rows));
});

app.post("/", async (req, res) => {
  zbc
    .createWorkflowInstance("camundacon-demo", { ...req.body, valid: true })
    .then((r) => res.json(r))
    .catch((r) => res.json(r));
});

http.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
