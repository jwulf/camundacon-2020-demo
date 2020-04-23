import { ZBClient } from "zeebe-node";
import { upsert } from "./db";
import { emit } from "./app";

export const zbc = new ZBClient();

zbc.deployWorkflow("./bpmn/model.bpmn").then(console.log);

zbc.createWorker(null, "log-message", (job, complete) => {
  console.log(job);
  complete.success();
});

zbc.createWorker(null, "update-database", (job, complete) => {
  const data = job.variables;
  upsert(data);
  emit(data);
  complete.success();
});
