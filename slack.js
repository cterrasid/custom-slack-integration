const webhook =
  "https://hooks.slack.com/services/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";
const requestify = require("requestify");

exports.sendMessage = function (message) {
  requestify.post(webhook, message);
};
