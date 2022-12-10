import knex from "knex";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configuracion para mysql
export const connectionMysql = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3308,
    user: "root",
    password: "12345",
    database: "myDatabase",
  },
  pool: { min: 0, max: 7 },
});

//configuracion para sqlite3
export const connectionSqlite3 = knex({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "..", "/db/sqlite3/myDb.sqlite3"),
  },
  useNullAsDefault: true,
});
