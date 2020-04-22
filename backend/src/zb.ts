import { ZBClient } from "zeebe-node";
import { upsert } from "./db";

export const zbc = new ZBClient();

zbc.deployWorkflow("./bpmn/model.bpmn").then(console.log);

zbc.createWorker({
  taskType: "log-message",
  taskHandler: (job, complete) => {
    console.log(job);
    complete.success();
  },
});

zbc.createWorker({
  taskType: "update-database",
  taskHandler: (job, complete) => {
    upsert(job.variables);
    complete.success();
  },
});
