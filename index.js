const express = require("express");
const slack = require("./slack.js");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

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

app.get("/", function (req, res) {
  res.send("hello!");
});

app.listen(port, function () {
  console.log("running on http://localhost:" + port);
});
