import { nSQL } from "@nano-sql/core";
import { SQLite } from "@nano-sql/adapter-sqlite";

// Persistent Database
nSQL().createDatabase({
  id: "camundacon",
  mode: new SQLite(),
  tables: [
    {
      name: "responses",
      model: {
        "id:uuid": { pk: true },
        "likes:string": {},
        "latitude:float": {},
        "longitude:float": {},
        "message:string": {},
      },
      indexes: {},
    },
  ],
});

export function upsert(data) {
  nSQL().useDatabase("camundacon");

  nSQL("responses").query("upsert", data).exec();
}
