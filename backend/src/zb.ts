import { ZBClient } from "zeebe-node";
import { upsert } from "./db";
import { emit } from "./socket";

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
    const data = job.variables;
    upsert(data);
    emit(data);
    complete.success();
  },
});
