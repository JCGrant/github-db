const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const uuid = require("uuid");
const core = require("@actions/core");
const github = require("@actions/github");

const TABLES_DIR = "tables";

const getFileContents = (filePath, defaultValue) => {
  try {
    return fs.readFileSync(filePath);
  } catch {
    return defaultValue;
  }
};

const buildTablePath = (tableName) =>
  path.join(TABLES_DIR, `${tableName}.json`);

const getTable = (tableName) => {
  const tablePath = buildTablePath(tableName);
  const tableContents = getFileContents(tablePath, "{}");
  return JSON.parse(tableContents);
};

const writeTable = (tableName, table) => {
  const tablePath = buildTablePath(tableName);
  const tableContents = JSON.stringify(table, null, 2);
  fs.writeFileSync(tablePath, tableContents);
};

const updaters = {
  add: (table, values) => {
    const id = uuid.v4();
    return [
      {
        ...table,
        [id]: {
          ...values,
          id,
        },
      },
      id,
    ];
  },
  update: (table, values) => [
    {
      ...table,
      [values.id]: values,
    },
    values.id,
  ],
  delete: (table, values) => [
    {
      ...table,
      [values.id]: undefined,
    },
    values.id,
  ],
};

const main = () => {
  const payload = github.context.payload;
  const action = payload.action;
  const { table_name: tableName, values } = payload.client_payload;

  const table = getTable(tableName);

  const updater = updaters[action];
  const [updatedTable, itemId] = updater(table, values);

  writeTable(tableName, updatedTable);

  const scriptPath = path.join(__dirname, "../commit_changes.sh");
  execSync(`bash ${scriptPath} ${action} ${itemId}`);
};

try {
  main();
} catch (error) {
  core.setFailed(error.message);
}
