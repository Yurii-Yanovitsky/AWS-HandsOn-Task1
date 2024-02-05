const AWS = require("aws-sdk");

function logToCloudWatchLogs(message) {
  const cloudwatchlogs = new AWS.CloudWatchLogs();

  const logParams = {
    logGroupName: "Task1EC2Logs",
    logStreamName: "Task1EC2Stream",
    logEvents: [
      {
        message: message,
        timestamp: new Date().getTime(),
      },
    ],
  };

  cloudwatchlogs.putLogEvents(logParams, (err, data) => {
    if (err) {
      console.error("Error logging to CloudWatch Logs:", err);
    } else {
      console.log("Successfully logged to CloudWatch Logs:", data);
    }
  });
}

function logToCloudWatchMiddleware(req, res, next) {
  // Log incoming requests
  const logMessage = `Logged by Yurii's App`;
  logToCloudWatchLogs(logMessage);
  next();
}

exports.logToCloudWatchLogs = logToCloudWatchLogs;
exports.logToCloudWatchMiddleware = logToCloudWatchMiddleware;
