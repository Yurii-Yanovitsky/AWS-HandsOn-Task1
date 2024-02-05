// Using CommonJS syntax
const express = require("express");

const { getPublicIpMiddleware } = require("./middleware/getPublicIpMiddleware");
const {
  logRequestToCloudWatch,
} = require("./middleware/logRequestToCloudWatch");
const { logToCloudWatchLogs, logToCloudWatchMiddleware } = require("./middleware/logToCloudWatchMiddleware");

const app = express();
const port = 3000;

app.use(
  logRequestToCloudWatch,
  logToCloudWatchMiddleware,
  getPublicIpMiddleware
);

app.get("/", (req, res) => {
  const publicIp = req.publicIp;
  res.send(`Public IP Address of the EC2 instance: ${publicIp}`);
});

app.use((err, req, res, next) => {
  // Log errors
  logToCloudWatchLogs(err.stack);
  res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
