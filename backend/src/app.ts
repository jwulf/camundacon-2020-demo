require("dotenv").config();
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { zbc } from "./zb";

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

app.post("/", async (req, res) => {
  zbc
    .createWorkflowInstance("camundacon-demo", { ...req.body, valid: true })
    .then((r) => res.json(r))
    .catch((r) => res.json(r));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
