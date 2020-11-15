const express = require("express");
const path = require("path");
const logger = require("morgan");
const slack = require("./slack.js");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/", (req, res) => {
  if (req.get("X-GitHub-Event") === "watch") {
    slack.sendMessage({
      text:
        "<" +
        req.body.sender.url +
        "|" +
        req.body.sender.login +
        "> " +
        req.body.action +
        " watching <" +
        req.body.repository.url +
        "|" +
        req.body.repository.name +
        ">",
    });
  }
  if (req.get("X-GitHub-Event") === "fork") {
    slack.sendMessage({
      text:
        "<" +
        req.body.sender.url +
        "|" +
        req.body.sender.login +
        "> forked <" +
        req.body.repository.url +
        "|" +
        req.body.repository.name +
        ">",
    });
  }
  res.sendStatus(200);
});

module.exports = app;
