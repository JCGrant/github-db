#!/usr/bin/env node

const fetch = require("node-fetch");
const {
  githubUsername,
  githubRepo,
  githubPersonalAccessToken,
  tableName,
  action,
  values,
} = require("./config.js");

const body = {
  event_type: action,
  client_payload: {
    table_name: tableName,
    values,
  },
};

fetch(
  `https://api.github.com/repos/${githubUsername}/${githubRepo}/dispatches`,
  {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Basic ${Buffer.from(
        `${githubUsername}:${githubPersonalAccessToken}`
      ).toString("base64")}`,
    },
  }
)
  .then((res) => res.text())
  .then(console.log);
