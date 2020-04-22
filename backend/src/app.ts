require("dotenv").config();
import { ZBClient } from "zeebe-node";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.options("*", cors());

const port = 3000;

const zbc = new ZBClient();

console.log("process.env", process.env);

zbc.deployWorkflow("./bpmn/model.bpmn").then(console.log);

zbc.createWorker({
  taskType: "log-message",
  taskHandler: (job, complete) => {
    console.log(job);
    complete.success();
  },
});

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
