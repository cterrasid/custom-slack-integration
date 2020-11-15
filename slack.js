const { IncomingWebhook } = require("@slack/webhook");

const url =
  "https://hooks.slack.com/services/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";

const webhook = new IncomingWebhook(url);

exports.sendMessage = async (message) => {
  await webhook.send(message);
};
